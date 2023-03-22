import * as React from 'react';
import { memo, useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { Button, Card, CardContent, CardMedia, Chip, Divider, FormHelperText, Grid, IconButton, Stack, Typography } from '@mui/material';
// assets
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import CancelIcon from '@mui/icons-material/Cancel';
import PropTypes from 'prop-types';
import { isString } from 'lodash';
import { gridSpacing } from '../../../store/constant';
import { BASE_URL } from '../../../config';
import { useDispatch } from '../../../store';
import ConfirmationDialogRaw from '../deleteDllal/ConfirmationDialog';
import useAuth from '../../../hooks/useAuth';
import { removeImage } from '../../../store/slices/dllal';
import ImageItem from './ImageItem';

const DropZoneStyle = styled('div')(({ theme }) => ({
    width: 64,
    height: 64,
    fontSize: 24,
    display: 'flex',
    cursor: 'pointer',
    alignItems: 'center',
    justifyContent: 'center',
    margin: theme.spacing(0.5),
    borderRadius: theme.shape.borderRadius,
    '&:hover': { opacity: 0.72 }
}));

const UploadImage = ({ id, touched, errors, setFieldValue, value, setOldImages, oldImages }) => {
    // مهم بقاء ال value محدثة
    // الاعتماد على قاعدة البيانات في حال حذف صور قديمة وإضافة جديدة.
    const theme = useTheme();
    const dispatch = useDispatch();
    const { isLoggedIn, checkLoggedIn } = useAuth();

    const onDrop = useCallback(
        (acceptedImages) => {
            setFieldValue(
                id,
                acceptedImages.map((image) => {
                    const reader = new FileReader();

                    reader.onabort = () => console.log('image reading was aborted');
                    reader.onerror = () => console.log('image reading has failed');
                    reader.readAsArrayBuffer(image);

                    return Object.assign(image, {
                        preview: URL.createObjectURL(image)
                    });
                })
            );
        },
        [id, setFieldValue]
    );

    const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject, fileRejections } = useDropzone({
        accept: {
            'image/*': ['.jpeg', '.png', '.jpg']
        },
        onDrop,
        maxFiles: 10,
        minSize: 5120,
        maxSize: 1048576
    });

    const [imageID, setImageID] = useState(0);
    const [open, setOpen] = useState(false);
    const handleClickDelete = (imageID) => {
        setImageID(imageID);
        checkLoggedIn();
        if (isLoggedIn) {
            setOpen(true);
        }
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleRemove = async (file) => {
        let imagesOld = [];

        if (file.id && oldImages && oldImages.length > 0) {
            try {
                await dispatch(removeImage(file.id));
                const filteredDefault = oldImages.filter((_file) => _file !== file);
                imagesOld = [...filteredDefault];
                setOldImages(imagesOld);
                if (value[0].id) {
                    setFieldValue(id, imagesOld);
                }
                setOpen(false);
            } catch (e) {
                console.log(e);
            }
        } else {
            const filteredAvatar = value.filter((_file) => _file !== file);
            setFieldValue(id, filteredAvatar);
        }
    };

    useEffect(() => {
        if (value.length === 0 && oldImages && oldImages.length > 0) {
            setFieldValue(id, oldImages);
        }
    }, [id, oldImages, setFieldValue, value]);

    return (
        <Grid item xs={12}>
            <Card
                sx={{
                    background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[50],
                    border: theme.palette.mode === 'dark' ? 'none' : '1px solid',
                    borderColor: theme.palette.grey[100],
                    textAlign: 'center'
                }}
            >
                <Grid container spacing={gridSpacing}>
                    {oldImages &&
                        oldImages.length > 0 &&
                        oldImages.map((avatarItem) => {
                            const { attributes, id, name } = avatarItem;

                            return (
                                <Grid key={id} item xs={4} sm={3} md={2} lg={1}>
                                    <CardMedia
                                        component="img"
                                        image={`${BASE_URL}${attributes?.formats?.thumbnail?.url}`}
                                        title={name}
                                        sx={{ height: '90px' }}
                                    />
                                    <IconButton size="small" color="secondary" onClick={() => handleClickDelete(avatarItem)}>
                                        <CancelIcon />
                                    </IconButton>
                                </Grid>
                            );
                        })}
                    {!value[0]?.id && value.length > 0 && (
                        <Grid item xs={12}>
                            <Divider>
                                <Chip label="صور الإعلان" />
                            </Divider>
                            <Grid container spacing={gridSpacing}>
                                {value.map((avatarItem, index) => {
                                    const { attributes, id, name, preview } = avatarItem;
                                    const key = id || index;

                                    return (
                                        <Grid key={key} item xs={4} sm={3} md={2} lg={1}>
                                            <CardMedia
                                                component="img"
                                                image={preview || `${BASE_URL}${attributes?.formats?.thumbnail?.url}`}
                                                title={isString(avatarItem) ? avatarItem : name}
                                                sx={{ height: '90px' }}
                                            />
                                            <IconButton size="small" color="secondary" onClick={() => handleRemove(avatarItem)}>
                                                <CancelIcon />
                                            </IconButton>
                                        </Grid>
                                    );
                                })}
                            </Grid>
                        </Grid>
                    )}
                    {fileRejections && fileRejections.length > 0 && (
                        <Grid item xs={12}>
                            <Divider>
                                <Chip label="صور مرفوضة" />
                            </Divider>
                            <Grid container spacing={gridSpacing}>
                                {fileRejections.map((rejection, index) => {
                                    const { file, errors } = rejection;
                                    Object.assign(file, {
                                        preview: URL.createObjectURL(file),
                                        errors
                                    });
                                    return (
                                        <Grid key={index} item xs={4} sm={3} md={2} lg={1}>
                                            <ImageItem image={file} errors={errors} />
                                        </Grid>
                                    );
                                })}
                            </Grid>
                        </Grid>
                    )}
                    <Grid item xs={12}>
                        <CardContent sx={{ p: 2, pb: '16px !important' }}>
                            <Grid container spacing={gridSpacing}>
                                <Grid item xs={12}>
                                    <Grid container spacing={gridSpacing}>
                                        <Grid item xs={12}>
                                            <Stack direction="column" alignItems="center" justifyContent="center">
                                                <DropZoneStyle
                                                    {...getRootProps()}
                                                    sx={{
                                                        ...(isDragActive && { opacity: 0.72 })
                                                    }}
                                                >
                                                    <input id={id} {...getInputProps()} />

                                                    <Button variant="outlined" size="large" sx={{ p: 2.25 }}>
                                                        <AddRoundedIcon />
                                                    </Button>
                                                </DropZoneStyle>
                                                <Grid item xs={12}>
                                                    {touched && errors && (
                                                        <FormHelperText error id="second-avatar">
                                                            {errors}
                                                        </FormHelperText>
                                                    )}
                                                </Grid>
                                            </Stack>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} alignItems="center">
                                    <Grid container spacing={1}>
                                        <Grid item xs={12}>
                                            <Typography variant="h4">صور الإعلان</Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            {isDragActive ? (
                                                <Typography variant="caption">أفلت الملفات هنا...</Typography>
                                            ) : (
                                                <Grid container spacing={1}>
                                                    <Grid item xs={12}>
                                                        <Typography variant="caption">إضغط علامة + لتحميل الصور أو إسحب وأفلت</Typography>
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <Typography variant="caption">
                                                            يجب أن يكون حجم الصورة أكبر من 5 كيلوبت وأصغر من 1 ميقا.
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <Typography variant="caption">لا يسمح بتحميل أكثر من 10 صور.</Typography>
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <Typography variant="caption">يسمح فقط بتحميل الصور.</Typography>
                                                    </Grid>
                                                </Grid>
                                            )}
                                        </Grid>
                                        <Grid item xs={12}>
                                            {isDragAccept && <Typography variant="caption">جميع الصور سليمة</Typography>}
                                            {isDragReject && <Typography variant="caption">بعض الملفات سيتم رفضها!.</Typography>}
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Grid>
                </Grid>
            </Card>
            <ConfirmationDialogRaw
                title="تأكيد حذف الصورة"
                content="هل تريد بالتأكيد حذف هذه الصورة"
                cancel="إلغاء"
                ok="حذف"
                _onOk={handleRemove}
                param={imageID}
                _onCancel={handleClose}
                open={open}
                keepMounted
            />
        </Grid>
    );
};

UploadImage.propTypes = {
    id: PropTypes.string,
    setFieldValue: PropTypes.func,
    value: PropTypes.array,
    touched: PropTypes.array,
    errors: PropTypes.string,
    defaultValue: PropTypes.array,
    dllalID: PropTypes.string,
    setOldImages: PropTypes.func,
    oldImages: PropTypes.array
};

export default memo(UploadImage);

import { Button, Card, CardContent, Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { gridSpacing } from '../../../store/constant';
import { Link } from 'react-router-dom';
import { DASHBOARD_PATH } from '../../../config';
import HomeTwoToneIcon from '@mui/icons-material/HomeTwoTone';

const ConstructionCard = styled(Card)({
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
});

const Terms = () => (
    <ConstructionCard>
        <CardContent>
            <Grid container justifyContent="center" spacing={gridSpacing}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Button variant="contained" size="large" component={Link} to={DASHBOARD_PATH}>
                            <HomeTwoToneIcon sx={{ fontSize: '1.3rem', mr: 0.75 }} /> الصفحة الرئيسية
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h1" variantMapping="h1" align="center">
                            اتفاقية الاستخدام
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h2" variantMapping="h2" align="center">
                            مقدمة
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body1" variantMapping="p" align="justify">
                            إن اتفاقية الاستخدام هذه وخصوصية الاستخدام ، والشروط والبنود ، وجميع السياسات التي تم نشرها على موقع دلّال
                            للتسويق الإلكتروني وضعت لحماية وحفظ حقوق كل من (موقع دلّال للتسويق الإلكتروني) و (المستخدم الذي يصل إلى الموقع
                            بتسجيل او من دون دون تسجيل)أو (العميل المستفيد من الإعلانات بتسجيل أو من دون تسجيل). تخضع البنود والشروط
                            والأحكام والمنازعات القانونية للقوانين والتشريعات والأنظمة المعمول بها محليا. لكونك مستخدم فأنك توافق على
                            الالتزام بكل ما يرد بهذه الاتفاقية في حال استخدامك للموقع او في حال الوصول اليه او في حالة التسجيل في الخدمة.
                            يحق لموقع دلّال التعديل على هذه الاتفاقية في أي وقت وتعتبر ملزمة لجميع الأطراف بعد الإعلان عن التحديث في الموقع
                            أو في أي وسيلة آخرى.
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h2" variantMapping="h2" align="center">
                            تعريف
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body1" variantMapping="p" align="justify">
                            موقع دلّال للتسويق الإلكتروني هي الجهة المالكة لموقع دلّال، وهي منصة الكترونية تمكن المستخدم (منشئ السجل
                            الإلكتروني) من فتح محل إلكتروني لتقديم خدماته وإيصالها للعميل المستهدف (مستقبل السجل الإلكتروني) وفق شروط وضوابط
                            محددة وتحت مسؤوليته. ويشار إليها بهذه الاتفاقية باسم (مؤسسة موقع دلّال للتسويق الإلكتروني) أو (نحن) أو (لنا) أو
                            (موقع دلّال)، وتمثل هنا الطرف الأول. المستخدم هو (الفرد او المؤسسة أو الشركة) المنشئ للسجل الإلكتروني الذي يصل
                            إلى الموقع ويستفيد من خدماته بشكل مباشر أو غير مباشر، ويشار إليه بالعضو أو الطرف الثاني, ويعتبر هو المسؤول عن
                            محتوى الإعلان مسؤولية كاملة وملتزم بضوابط وشروط المحتوى الموضحة من قبل الموقع ويتحمل تبعات وأضرار محتوى الإعلان.
                            العميل: هو الجهة (الفرد أو المؤسسة أو الشركة) التي ينتهي إليه السجل الإلكتروني، والمستهدفة من قبل المستخدم (منشئ
                            السجل الإلكتروني). السجل الإلكتروني: هو البيانات التي تنشأ أو تحفظ أو ترسل من قبل المستخدم (منشئ السجل
                            الإلكتروني) وتكون على شكل تقديم خدمة أو طلب خدمة او ردود او رسائل خاصة.
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h2" variantMapping="h2" align="center">
                            شروط الاستخدام
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        بصفتك طرف ثاني في هذه الاتفاقية فإنه بموافقتك على الاستفادة من خدمات الموقع فعليك الالتزام بما يلي:
                        <Typography variant="body1" variantMapping="p" align="justify">
                            بعدم الإعلان أو تحميل محتوى أو عناصر غير ملائمة للتصنيفات المتاحة في الموقع و المسموح ببيعها. وعليك مراجعة شروط
                            الإعلان و السلع الممنوعة.
                        </Typography>
                        <Typography variant="body1" variantMapping="p" align="justify">
                            بعدم الاختراق أو التحايل على قوانين وسياسة وأنظمة الموقع أو أي حقوق تتعلق بطرف ثالث.
                        </Typography>
                        <Typography variant="body1" variantMapping="p" align="justify">
                            بعدم نسخ الإعلان من مؤسسة موقع دلّال للتسويق الإلكتروني وإعادة نشرها في مواقع أخرى.
                        </Typography>
                        <Typography variant="body1" variantMapping="p" align="justify">
                            بعدم استخدام أي وسيلة غير شرعية للوصول للإعلانات أو لبيانات المستخدمين الآخرين أو انتهاك لسياسة وحقوق مؤسسة موقع
                            دلّال للتسويق الإلكتروني،أو الوصول لمحتوى الموقع أو تجميع وتحصيل معلومات وبيانات تخص موقع دلّال أو عملاء الموقع
                            والاستفادة منها بأي شكل من الأشكال أو إعادة نشرها.
                        </Typography>
                        <Typography variant="body1" variantMapping="p" align="justify">
                            بعدم استخدام خدماتنا إذا كنت غير مؤهل قانونيا لإتمام هذه الاتفاقية. على سبيل المثال أنك أقل من 18 سنة أو أنك
                            محجوب بشكل مؤقت أو دائم من استخدام الموقع.
                        </Typography>
                        <Typography variant="body1" variantMapping="p" align="justify">
                            بعدم التلاعب بأسعار السلع سواء في البيع او الشراء وإلحاق الضرر بالمستخدمين الآخرين.
                        </Typography>
                        <Typography variant="body1" variantMapping="p" align="justify">
                            بعدم نشر إعلانات أو تعليقات كاذبة أو غير دقيقة أو مضللة أو خادعة أو قذف ، أو تشهير.
                        </Typography>
                        <Typography variant="body1" variantMapping="p" align="justify">
                            بعدم التعرض للسياسات أو السيادات الدولية أو الشخصيات المعتبرة أو أي مناقشات لا تتعلق بالبيع والشراء المشروعة في
                            موقع دلّال للتسويق الإلكتروني.
                        </Typography>
                        <Typography variant="body1" variantMapping="p" align="justify">
                            بعدم نقل حسابك أو نشاطك إلى مواقع اخرى بالوقت الذي هو يحمل شعار أو خدمات موقع دلّال.
                        </Typography>
                        <Typography variant="body1" variantMapping="p" align="justify">
                            بعدم انتهاك حقوق الآخرين الملكية أو الفكرية أو براءة الاختراع.
                        </Typography>
                        <Typography variant="body1" variantMapping="p" align="justify">
                            بعدم الاعلان عن منتجات التبغ والدخان.
                        </Typography>
                        <Typography variant="body1" variantMapping="p" align="justify">
                            بعدم انتهاك أنظمة حقوق الإنسان وبعدم المتاجرة بالأشخاص بأي شكل من الأشكال ويجب عليك الإلتزام بضوابط الإعلان عن
                            تقديم الخدمات العمالية.
                        </Typography>
                        <Typography variant="body1" variantMapping="p" align="justify">
                            بعدم انتهاك أنظمة حماية الحياة الفطرية.
                        </Typography>
                        <Typography variant="body1" variantMapping="p" align="justify">
                            بعدم جمع معلومات عن مستخدمي الموقع الآخرين لأغراض تجارية أو غيرها.
                        </Typography>
                        <Typography variant="body1" variantMapping="p" align="justify">
                            بعدم الإقدام على أي ما من شأنه إلحاق الضرر بسمعة موقع دلّال للتسويق الإلكتروني.
                        </Typography>
                        <Typography variant="body1" variantMapping="p" align="justify">
                            بعدم انتحال صفة موقع دلّال للتسويق الإلكتروني أو ممثل لها أو موظف فيها أو أي صفة توحي بأنك تابع للموقع ما لم
                            يكون لديك أذن رسمي من مالك الموقع.
                        </Typography>
                        <Typography variant="body1" variantMapping="p" align="justify">
                            إن عدم التزامك بتلك الشروط يمنح موقع دلّال للتسويق الإلكتروني الحق كاملا بحجب عضويتك ومنعك من الوصول للموقع
                            وإضافة رقم هاتفك في القائمة السوداء دون ادنى مسؤولية و دون الحاجة لإخطارك بذلك وأنت هنا تتعهد بعدم العودة
                            لاستخدام الموقع إلى بعد موافقة الموقع على ذلك.
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h2" variantMapping="h2" align="center">
                            شروط العضوية
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        العضوية هي: اسم المستخدم أو الإيميل الذي سجل به الشخص في موقع دلّال، ويجب أن تكون خاضعة للشروط التالية:
                        <Typography variant="body1" variantMapping="p" align="justify">
                            يلزم اختيار اسم لائق ومناسب خلال عملية التسجيل.
                        </Typography>
                        <Typography variant="body1" variantMapping="p" align="justify">
                            يُمنع استخدام اكثر من عضوية في الموقع لكل شخص أو جهة.
                        </Typography>
                        <Typography variant="body1" variantMapping="p" align="justify">
                            يجب ان تقوم بتحديث رقم جوالك المرتبط بالعضوية في حال تغيير رقم جوالك او فقدانه.
                        </Typography>
                        <Typography variant="body1" variantMapping="p" align="justify">
                            اذا كان اسم عضويتك يحتوي على اسم تجاري أو علامة تجارية ، يجب ان تكون المالك للعلامة التجارية او مخول لك باستخدام
                            الاسم او العلامة التجارية.
                        </Typography>
                        <Typography variant="body1" variantMapping="p" align="justify">
                            يمنع بيع العضوية أو التنازل عنها لطرف آخر أو السماح لأي طرف آخر باستخدامها ويتعبر صاحب العضوية الأول هو المسؤول
                            عنها تجاه أي مخالفات أو مسؤوليات قانونية ، وسيعتبر كلا الطرفين في حالة البيع أو التنازل مخالفين لسياسة الاستخدام
                            في موقع دلّال. يلتزم العضو بعدم مشاركة معلومات عضويته الخاصة به مع أي أحد.
                        </Typography>
                        <Typography variant="body1" variantMapping="p" align="justify">
                            يلتزم موقع دلّال باتخاذ المعايير اللازمة لحماية البيانات وحفظها، علما بأن شبكة الانترنت ليست وسيلة آمنة بنسبة
                            ١٠٠٪ لحفظ المعلومات السرية.
                        </Typography>
                        <Typography variant="body1" variantMapping="p" align="justify">
                            تتبادل الخدمة بعض المعلومات مع جهازك لغرض تقديم الخدمة لك.
                        </Typography>
                        <Typography variant="body1" variantMapping="p" align="justify">
                            يستخدم الموقع برامج احصائية مثل Google Analytics و ذلك لأجل تطوير الخدمة وتحسينها.
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h2" variantMapping="h2" align="center">
                            وثيقة الخصوصية
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body1" variantMapping="p" align="justify">
                            الخصوصية وبيان سريّة المعلومات نقدر مخاوفكم واهتمامكم بشأن خصوصية بياناتكم على شبكة الإنترنت. لقد تم إعداد هذه
                            السياسة لمساعدتكم في تفهم طبيعة البيانات التي نقوم بتجميعها منكم عند زيارتكم لموقعنا على شبكة الانترنت وكيفية
                            تعاملنا مع هذه البيانات الشخصية.
                        </Typography>
                        <Typography variant="body1" variantMapping="p" align="justify">
                            التصفح لم نقم بتصميم هذا الموقع من أجل تجميع بياناتك الشخصية من جهاز الكمبيوتر الخاص بك أو من جوالك أثناء تصفحك
                            لهذا الموقع، وإنما سيتم فقط استخدام البيانات المقدمة من قبلك بمعرفتك ومحض إرادتك.
                        </Typography>
                        <Typography variant="body1" variantMapping="p" align="justify">
                            عنوان بروتوكول شبكة الإنترنت (IP) في أي وقت تزور فيه اي موقع انترنت بما فيها هذا الموقع , سيقوم السيرفر المضيف
                            بتسجيل عنوان بروتوكول شبكة الإنترنت (IP) الخاص بك , تاريخ ووقت الزيارة ونوع متصفح الإنترنت الذي تستخدمه والعنوان
                            URL الخاص بأي موقع من مواقع الإنترنت التي تقوم بإحالتك إلى الى هذا الموقع على الشبكة.
                        </Typography>
                        <Typography variant="body1" variantMapping="p" align="justify">
                            الروابط بالمواقع الأخرى على شبكة الإنترنت قد يشتمل موقعنا على روابط بالمواقع الأخرى على شبكة الإنترنت. لا نعتبر
                            مسئولين عن تلك المواقع، يمكنك الاطلاع على سياسات السرية والمحتويات الخاصة بتلك المواقع التي يتم الدخول إليها من
                            خلال أي رابط ضمن هذا الموقع.
                        </Typography>
                        <Typography variant="body1" variantMapping="p" align="justify">
                            إفشاء المعلومات سنحافظ في كافة الأوقات على خصوصية وسرية كافة البيانات الشخصية التي نتحصل عليها. ولن يتم إفشاء
                            هذه المعلومات إلا إذا كان ذلك مطلوباً بموجب أي قانون أو عندما نعتقد بحسن نية أن مثل هذا الإجراء سيكون مطلوباً أو
                            مرغوباً فيه للتمشي مع القانون ، أو للدفاع عن أو حماية حقوق الملكية الخاصة بهذا الموقع أو الجهات المستفيدة منه.
                        </Typography>
                        <Typography variant="body1" variantMapping="p" align="justify">
                            البيانات اللازمة لتنفيذ المعاملات المطلوبة من قبلك عندما نحتاج إلى أية بيانات خاصة بك , فإننا سنطلب منك تقديمها
                            بمحض إرادتك. حيث ستساعدنا هذه المعلومات في الاتصال بك وتنفيذ طلباتك حيثما كان ذلك ممكنناً. لن يتم اطلاقاً بيع
                            البيانات المقدمة من قبلك إلى أي طرف ثالث بغرض تسويقها لمصلحته الخاصة دون الحصول على موافقتك المسبقة والمكتوبة ما
                            لم يتم ذلك على أساس أنها ضمن بيانات جماعية تستخدم للأغراض الإحصائية والأبحاث دون اشتمالها على أية بيانات من
                            الممكن استخدامها للتعريف بك.
                        </Typography>
                        <Typography variant="body1" variantMapping="p" align="justify">
                            عند الاتصال بنا سيتم التعامل مع كافة البيانات المقدمة من قبلك على أساس أنها سرية . تتطلب النماذج التي يتم
                            تقديمها مباشرة على الشبكة تقديم البيانات التي ستساعدنا في تحسين موقعنا.سيتم استخدام البيانات التي يتم تقديمها من
                            قبلك في الرد على كافة استفساراتك , ملاحظاتك , أو طلباتك من قبل هذا الموقع أو أيا من المواقع التابعة له .
                        </Typography>
                        <Typography variant="body1" variantMapping="p" align="justify">
                            إفشاء المعلومات لأي طرف ثالث لن نقوم ببيع , المتاجرة , تأجير , أو إفشاء أية معلومات لمصلحة أي طرف ثالث خارج هذا
                            الموقع, أو المواقع التابعة له.
                        </Typography>
                        <Typography variant="body1" variantMapping="p" align="justify">
                            التعديلات على سياسة سرية وخصوصية المعلومات نحتفظ بالحق في تعديل بنود وشروط سياسة سرية وخصوصية المعلومات إن لزم
                            الأمر ومتى كان ذلك ملائماً. سيتم تنفيذ التعديلات هنا او على صفحة سياسة الخصوصية الرئيسية وسيتم بصفة مستمرة
                            إخطارك بالبيانات التي حصلنا عليها , وكيف سنستخدمها والجهة التي سنقوم بتزويدها بهذه البيانات.الاتصال بنا يمكنكم
                            الاتصال بنا عند الحاجة من خلال الضغط على رابط اتصل بنا المتوفر في روابط موقعنا او الارسال الى بريدنا الالكتروني
                            haraj على اسم النطاق اعلاه.
                        </Typography>
                        <Typography variant="body1" variantMapping="p" align="justify">
                            اخيرا إن مخاوفك واهتمامك بشأن سرية وخصوصية البيانات تعتبر مسألة في غاية الأهمية بالنسبة لنا. نحن نأمل أن يتم
                            تحقيق ذلك من خلال هذه السياسة.
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" size="large" component={Link} to={DASHBOARD_PATH}>
                            <HomeTwoToneIcon sx={{ fontSize: '1.3rem', mr: 0.75 }} /> الصفحة الرئيسية
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </CardContent>
    </ConstructionCard>
);

export default Terms;

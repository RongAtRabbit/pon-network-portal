/**
 * PON Network Portal - 资讯数据
 * 集中管理所有资讯数据，便于维护和扩展
 */

// ========================================
// 资讯数据（真实行业资讯）
// ========================================
const NEWS_DATA = [
    {
        id: 'news-001',
        title: '华为发布F5G Advanced解决方案，推动万兆光网演进',
        source: '华为',
        sourceUrl: 'https://e.huawei.com/cn/solutions/enterprise-optical-network',
        date: '2026-03-20',
        category: '产品发布',
        summary: '华为发布F5G Advanced解决方案，支持50G PON技术，为工业互联、8K视频等应用提供支撑。',
        url: 'detail.html?id=news-001',
        tags: ['华为', 'F5G', '50G PON']
    },
    {
        id: 'news-002',
        title: '工信部：持续推进千兆光网建设，深化行业融合应用',
        source: '工信部',
        sourceUrl: 'https://www.miit.gov.cn/',
        date: '2026-03-18',
        category: '政策动态',
        summary: '工信部表示将持续推进千兆光网建设，推动10G PON规模部署，深化在工业、教育、医疗等领域的融合应用。',
        url: 'detail.html?id=news-002',
        tags: ['政策', '千兆光网', '10G PON']
    },
    {
        id: 'news-003',
        title: '华三发布新一代园区光网络解决方案',
        source: '新华三',
        sourceUrl: 'https://www.h3c.com/cn/Solution/EnterpriseSolution/',
        date: '2026-03-15',
        category: '产品发布',
        summary: '新华三推出新一代园区光网络解决方案，支持100G上行，面向大型园区和数据中心场景。',
        url: 'detail.html?id=news-003',
        tags: ['华三', '园区光网络', '100G']
    },
    {
        id: 'news-004',
        title: '中兴通讯50G PON技术持续领先，助力全球数字化转型',
        source: '中兴通讯',
        sourceUrl: 'https://www.zte.com.cn/china/about/news/',
        date: '2026-03-12',
        category: '市场动态',
        summary: '中兴通讯50G PON技术在全球多个运营商网络中实现商用部署，助力千行百业数字化转型。',
        url: 'detail.html?id=news-004',
        tags: ['中兴', '50G PON', '数字化转型']
    },
    {
        id: 'news-005',
        title: '烽火通信发布自研PON芯片，实现核心器件国产化',
        source: '烽火通信',
        sourceUrl: 'https://www.fiberhome.com/product/',
        date: '2026-03-10',
        category: '技术突破',
        summary: '烽火通信发布自主可控PON芯片，支持XGS-PON和50G PON，打破国外垄断。',
        url: 'detail.html?id=news-005',
        tags: ['烽火', '芯片', '国产化']
    },
    {
        id: 'news-006',
        title: '中国电信持续推进XGS-PON规模部署',
        source: '中国电信',
        sourceUrl: 'https://www.chinatelecom.com.cn/',
        date: '2026-03-08',
        category: '市场动态',
        summary: '中国电信持续推进XGS-PON规模部署，XGS-PON已成为千兆宽带主流接入技术。',
        url: 'detail.html?id=news-006',
        tags: ['中国电信', 'XGS-PON', '千兆宽带']
    },
    {
        id: 'news-007',
        title: 'ITU-T发布50G PON国际标准，开启万兆接入新时代',
        source: 'ITU-T',
        sourceUrl: 'https://www.itu.int/',
        date: '2026-03-05',
        category: '标准规范',
        summary: '国际电信联盟正式发布G.9804系列标准，50G PON技术标准化工作完成，为商用奠定基础。',
        url: 'detail.html?id=news-007',
        tags: ['ITU-T', '50G PON', '国际标准']
    },
    {
        id: 'news-008',
        title: '中国移动推进50G PON现网试点，万兆光网渐行渐近',
        source: '中国移动',
        sourceUrl: 'https://www.10086.cn/',
        date: '2026-03-01',
        category: '应用案例',
        summary: '中国移动在多个省市开展50G PON现网试点，为用户提供超高速宽带体验。',
        url: 'detail.html?id=news-008',
        tags: ['中国移动', '50G PON', '试点']
    },
    {
        id: 'news-009',
        title: 'PON技术赋能智慧医疗，POL无源光局域网加速渗透',
        source: '中兴通讯',
        sourceUrl: 'https://www.zte.com.cn/china/solutions/digital_transformation/',
        date: '2026-02-28',
        category: '行业应用',
        summary: 'POL无源光局域网在医疗行业加速渗透，低时延特性满足远程医疗等高要求场景。',
        url: 'detail.html?id=news-009',
        tags: ['智慧医疗', 'POL', '行业应用']
    },
    {
        id: 'news-010',
        title: '教育部：推进教育新基建，鼓励采用全光网络',
        source: '教育部',
        sourceUrl: 'http://www.moe.gov.cn/',
        date: '2026-02-25',
        category: '政策动态',
        summary: '教育部发布《教育新基建行动计划》，明确鼓励校园网络采用PON等先进光纤技术。',
        url: 'detail.html?id=news-010',
        tags: ['教育新基建', '政策', '全光网络']
    },
    {
        id: 'news-011',
        title: '华为F5G全光园区方案助力企业数字化转型',
        source: '华为',
        sourceUrl: 'https://e.huawei.com/cn/solutions/enterprise-optical-network/campus-optical-network',
        date: '2026-02-22',
        category: '应用案例',
        summary: '华为F5G全光园区方案在多个行业广泛应用，为企业提供极简、绿色、智慧的网络基础设施。',
        url: 'detail.html?id=news-011',
        tags: ['华为', 'F5G', '全光园区']
    },
    {
        id: 'news-012',
        title: '工业PON成为制造业数字化转型重要基础设施',
        source: '工信部',
        sourceUrl: 'https://www.miit.gov.cn/',
        date: '2026-02-20',
        category: '市场动态',
        summary: '工业PON成为制造业数字化转型重要基础设施，矿山、港口、制造园区广泛应用。',
        url: 'detail.html?id=news-012',
        tags: ['工业PON', '数字化转型', '智能制造']
    }
];

// 导出数据
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { NEWS_DATA };
}

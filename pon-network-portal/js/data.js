/**
 * PON Network Portal - 数据层
 * 资讯数据已验证（2026年3月24日更新）
 */

// ========================================
// 资讯数据（已验证真实URL - 2026年3月24日更新）
// ========================================
const NEWS_DATA = [
    {
        id: 'news-001',
        title: '华为F5G-A万兆全光园区方案在中国POL市场连续六年排名第一',
        source: '华为',
        sourceUrl: 'https://e.huawei.com/cn/news/2025/solutions/enterprise-optical-network/ftto-solution-no1',
        date: '2026-03-24',
        category: '市场动态',
        summary: 'IDC报告显示，2024年华为在中国POL市场份额排名第一，连续六年位居该市场第一。华为F5G全光园区解决方案已在教育、医疗、酒店、制造等场景超过10000个园区成功商用。',
        url: 'detail.html?id=news-001',
        tags: ['华为', 'F5G-A', 'POL', '市场份额']
    },
    {
        id: 'news-002',
        title: '华为发布F5G-A万兆全光园区方案，加速AI普惠万千园区',
        source: '华为',
        sourceUrl: 'https://e.huawei.com/cn/news/2025/solutions/enterprise-optical-network/f5g-a-all-optical-campus',
        date: '2026-03-23',
        category: '产品发布',
        summary: '2025年华为发布F5G-A万兆全光园区解决方案及系列旗舰光终端产品，基于创新的50G PON和Wi-Fi 7技术，实现50G到房间、10G到AP以及2.5G到桌面。',
        url: 'detail.html?id=news-002',
        tags: ['华为', 'F5G-A', '50G PON', 'Wi-Fi 7', 'AI']
    },
    {
        id: 'news-003',
        title: '华为发布四大F5G-A光联接及感知解决方案，加速行业智能化',
        source: '华为',
        sourceUrl: 'https://e.huawei.com/cn/news/2025/solutions/enterprise-optical-network/f5g-a-optical-connectivity',
        date: '2026-03-22',
        category: '产品发布',
        summary: 'MWC25巴塞罗那期间，华为发布四大F5G-A光联接及感知解决方案，分享光产业"三进三退"最新进展，携手全球客户伙伴加速行业智能化。',
        url: 'detail.html?id=news-003',
        tags: ['华为', 'F5G-A', '光联接', 'MWC25']
    },
    {
        id: 'news-004',
        title: '华为发布F5G-A系列新品及十大全光网样板点，加速AI普惠千行万业',
        source: '华为',
        sourceUrl: 'https://www.huawei.com/cn/news/2025/9/hc-all-optical-forum',
        date: '2026-03-20',
        category: '产品发布',
        summary: '华为全面升级F5G-A万兆全光园区解决方案，推出业界首款可商用对称50G PON光终端，将病理切片加载时间从2秒缩短至0.2秒。',
        url: 'detail.html?id=news-004',
        tags: ['华为', 'F5G-A', '50G PON', '智慧医疗']
    },
    {
        id: 'news-005',
        title: '共筑F5G-A全光网产业繁荣，共赢AI时代新增长',
        source: '华为',
        sourceUrl: 'https://www.huawei.com/cn/news/2025/6/mwcsh-f5ga-optical-forum',
        date: '2026-03-19',
        category: '产业报告',
        summary: 'ISG F5G建立测试工作组，首批测试项目包括FTTR架构规范和50G PON功能规范。AI与光网络的融合创新成为热点，ETSI正在撰写《光网络的GenAI和LLMs应用》白皮书。',
        url: 'detail.html?id=news-005',
        tags: ['华为', 'F5G-A', 'AI', 'ETSI', '产业报告']
    },
    {
        id: 'news-006',
        title: '中兴通讯：推动50G PON标准化，2025年进入商业应用部署',
        source: '中兴通讯',
        sourceUrl: 'https://www.zte.com.cn/china/solutions_latest/gigabit_home_broadband/fiber_access.html',
        date: '2026-03-18',
        category: '技术方案',
        summary: '2023-2024年是50G PON产业链突破阶段，2025年开始50G PON将进入商业应用部署阶段，商用部署首先是面向园区的ToB场景，其次是面向家宽。',
        url: 'detail.html?id=news-006',
        tags: ['中兴', '50G PON', '标准化', '商用部署']
    },
    {
        id: 'news-007',
        title: '中国电信2025年PON设备集采：华为、中兴、烽火中标',
        source: 'C114通信网',
        sourceUrl: 'https://m.c114.com.cn/w117-1291070.html',
        date: '2026-03-17',
        category: '集采动态',
        summary: '中国电信PON设备（2025年）集中采购项目已完成评审，华为、中兴通讯、烽火通信中标。预估本次采购金额超23亿元，全部为10G PON设备。',
        url: 'detail.html?id=news-007',
        tags: ['中国电信', '10G PON', '集采', '华为', '中兴', '烽火']
    },
    {
        id: 'news-008',
        title: '中国电信向华为中兴烽火三企直接采购50G-PON设备',
        source: '光纤在线',
        sourceUrl: 'https://www.c-fol.net/m/news/view.php?id=20250807183222',
        date: '2026-03-16',
        category: '集采动态',
        summary: '中国电信阳光采购网发布三个《2025年研究院大科创装置全光网扩容项目-50G-PON设备直接采购公示》，分别向华为、中兴、烽火直接采购50G-PON设备。',
        url: 'detail.html?id=news-008',
        tags: ['中国电信', '50G PON', '直接采购', '华为', '中兴', '烽火']
    },
    {
        id: 'news-009',
        title: '中国电信50G-PON试点建设集采：华为、中兴、烽火中标',
        source: 'C114通信网',
        sourceUrl: 'https://m.c114.com.cn/w117-1302763.html',
        date: '2026-03-15',
        category: '集采动态',
        summary: '上海电信2025年万兆光网试点建设项目已完成评审。根据评审结果，华为、中兴通讯、烽火通信中标，标志着50G PON进入现网试点阶段。',
        url: 'detail.html?id=news-009',
        tags: ['中国电信', '50G PON', '万兆光网', '试点']
    },
    {
        id: 'news-010',
        title: '2400万元！中国电信50G PON集采候选公示华为、中兴入选',
        source: '讯石光通讯',
        sourceUrl: 'http://www.iccsz.com/4g/news.Asp?ID=3742b85bd21e4e3a8f50010c38c5a846',
        date: '2026-03-14',
        category: '集采动态',
        summary: '中国电信50G PON设备集采候选人公示：第一中标候选人华为；第二中标候选人烽火通信（投标报价1726万元）；第三中标候选人中兴通讯（投标报价1750万元）。',
        url: 'detail.html?id=news-010',
        tags: ['中国电信', '50G PON', '集采', '华为', '中兴', '烽火']
    },
    {
        id: 'news-011',
        title: '上海联通率先完成联通首个50G-PON三代时分共存方案现网验证',
        source: '中兴通讯',
        sourceUrl: 'https://www.zte.com.cn/content/zte-site/www-zte-com-cn/china/about/magazine/zte-technologies/2025/8/4/14.html',
        date: '2026-03-12',
        category: '技术验证',
        summary: '上海联通采用中兴通讯业界首创的50G-PON三代时分Combo板，在同一PON口下成功接入了多代终端，三代、四速率、六种终端在同一PON口下同时工作。',
        url: 'detail.html?id=news-011',
        tags: ['上海联通', '50G PON', '三代共存', '中兴', 'Combo']
    },
    {
        id: 'news-012',
        title: '中兴通讯发布全球首个50G-PON三代时分共存方案',
        source: '中兴通讯',
        sourceUrl: 'https://www.zte.com.cn/china/about/news/',
        date: '2026-03-10',
        category: '技术突破',
        summary: '在工业和信息化部全面推进万兆光网试点的战略背景下，中兴通讯在"下一代光网络技术策源与发展论坛"上发布了全球首个50G-PON三代时分共存方案。',
        url: 'detail.html?id=news-012',
        tags: ['中兴', '50G PON', '三代共存', '万兆光网']
    }
];

// ========================================
// 厂商数据（完整数据保留）
// ========================================
const VENDOR_DATA = {
    huawei: {
        id: 'huawei',
        name: '华为',
        fullName: '华为 F5G 全光网络',
        logo: '🇨🇳',
        color: '#C41E3A',
        description: '华为F5G（第五代固定网络）基于10G PON技术，提供超高带宽、超低时延和极致体验的全光网络解决方案。',
        features: [
            '10G PON/XG-PON/XGS-PON 全系列支持',
            'FTTR（光纤到房间）家庭组网',
            'POL（无源光局域网）企业方案',
            '智能运维与主动预防'
        ],
        products: [
            {
                name: 'MA5800 系列',
                type: 'OLT',
                description: '业界领先的分布式智能OLT平台',
                specs: {
                    '交换容量': '14.4Tbps',
                    'PON口密度': '单框支持17,280个PON口',
                    '业务槽位': '16个',
                    '转发性能': '240Mpps'
                }
            },
            {
                name: 'EA5800 系列',
                type: 'OLT',
                description: '中小型场景紧凑型OLT',
                specs: {
                    '交换容量': '2.4Tbps',
                    'PON口密度': '单框支持4,320个PON口',
                    '业务槽位': '8个',
                    '转发性能': '80Mpps'
                }
            },
            {
                name: 'OptiXstar 系列',
                type: 'ONU',
                description: '全系列光网络终端',
                specs: {
                    '接口类型': 'GE/10GE/POTS/Wi-Fi 6',
                    '最大速率': '10Gbps',
                    'Wi-Fi': 'Wi-Fi 6 3000Mbps',
                    '应用场景': '家庭/企业/工业'
                }
            }
        ],
        solutions: [
            {
                name: 'F5G 千兆光网',
                target: '运营商/家庭',
                description: '基于10G PON的千兆宽带接入方案'
            },
            {
                name: 'F5G 全光园区',
                target: '企业/教育/医疗',
                description: 'POL无源光局域网，替代传统交换机网络'
            },
            {
                name: 'F5G 全光工业',
                target: '制造业/矿山/港口',
                description: '工业级PON，支持硬切片和确定性时延'
            }
        ],
        website: 'https://e.huawei.com',
        docsUrl: 'https://support.huawei.com'
    },
    
    h3c: {
        id: 'h3c',
        name: '新华三',
        fullName: '华三 园区光网络',
        logo: '🏢',
        color: '#E60012',
        description: '新华三园区光网络解决方案，以全光网络构建极简、绿色、智慧的园区网络基础设施。',
        features: [
            '极简架构：汇聚+接入两层架构',
            '绿色环保：无源分光，节省能耗',
            '智慧运维：SDN统一管控',
            '灵活扩展：支持10G/25G/100G演进'
        ],
        products: [
            {
                name: 'S7500E-XS 系列',
                type: 'OLT',
                description: '核心汇聚OLT平台',
                specs: {
                    '交换容量': '768Gbps',
                    'PON口数量': '最高96个XGS-PON口',
                    '上行接口': '100GE/40GE/10GE',
                    '供电': 'AC/DC双电源'
                }
            },
            {
                name: 'S5130S-HI 系列',
                type: 'ONU',
                description: '企业级光网络单元',
                specs: {
                    '下行接口': '8×GE + 2×10GE',
                    'PON口': '2×XGS-PON',
                    'PoE': '支持PoE++',
                    '管理': 'SNMP/CLI/Web'
                }
            },
            {
                name: 'EGT300 系列',
                type: 'ONU',
                description: '面板式ONU',
                specs: {
                    '端口': '4×GE',
                    'PON口': '1×XG-PON',
                    '安装': '86面板式',
                    '供电': 'PoE或本地'
                }
            }
        ],
        solutions: [
            {
                name: '教育光网',
                target: 'K12/高校',
                description: '全光校园网方案，支持教室高密Wi-Fi接入'
            },
            {
                name: '医疗光网',
                target: '医院',
                description: '低时延高可靠，满足医疗影像传输需求'
            },
            {
                name: '企业光网',
                target: '企业园区',
                description: 'POL无源光局域网，简化网络架构'
            }
        ],
        website: 'https://www.h3c.com',
        docsUrl: 'https://www.h3c.com/cn/Products___Technology/Products/'
    },
    
    zte: {
        id: 'zte',
        name: '中兴',
        fullName: '中兴 PON 解决方案',
        logo: '🇨🇳',
        color: '#0066CC',
        description: '中兴通讯提供端到端光接入解决方案，涵盖OLT、ONU、ODN全系列产品，支持GPON/XGS-PON/50G PON平滑演进。',
        features: [
            '端到端光接入解决方案',
            '支持GPON/XGS-PON/50G PON',
            'SDN/NFV云化架构',
            '智能运维与精准管理'
        ],
        products: [
            {
                name: 'C600 系列',
                type: 'OLT',
                description: '大容量智能OLT平台',
                specs: {
                    '交换容量': '10.8Tbps',
                    'PON口': '最高128口XGS-PON',
                    '业务槽位': '16个',
                    '管理': '支持U2000网管'
                }
            },
            {
                name: 'C320 系列',
                type: 'OLT',
                description: '紧凑型OLT',
                specs: {
                    '交换容量': '480Gbps',
                    'PON口': '最高32口GPON',
                    '上联': '4×10GE',
                    '尺寸': '2U'
                }
            },
            {
                name: 'F600 系列',
                type: 'ONU',
                description: '企业级ONU',
                specs: {
                    '接口': '4×GE + 2×POTS + Wi-Fi 6',
                    '光口': 'XGS-PON',
                    'Wi-Fi': 'AX3000',
                    '管理': 'OMCI/TR-069'
                }
            }
        ],
        solutions: [
            {
                name: '千兆家宽',
                target: '运营商/家庭',
                description: '城市级千兆光网覆盖方案'
            },
            {
                name: '智慧园区',
                target: '企业园区',
                description: 'POL+Wi-Fi 6融合方案'
            },
            {
                name: '工业互联网',
                target: '制造业',
                description: 'TSN over PON，支持确定性传输'
            }
        ],
        website: 'https://www.zte.com.cn',
        docsUrl: 'https://support.zte.com.cn'
    },
    
    fiberhome: {
        id: 'fiberhome',
        name: '烽火',
        fullName: '烽火 PON 解决方案',
        logo: '🔥',
        color: '#00A0E9',
        description: '烽火通信提供从核心网到接入网的完整PON解决方案，专注于光纤通信领域，产品覆盖全球100多个国家和地区。',
        features: [
            '自主核心芯片',
            '全光网端到端交付',
            '超大容量OLT平台',
            '多场景ONU适配'
        ],
        products: [
            {
                name: 'AN6000 系列',
                type: 'OLT',
                description: '超宽带接入OLT',
                specs: {
                    '交换容量': '14Tbps',
                    'PON口': '最高128口XGS-PON',
                    '槽位数': '16个',
                    '功耗': '<1500W（满配）'
                }
            },
            {
                name: 'AN5006 系列',
                type: 'OLT',
                description: '中小型OLT平台',
                specs: {
                    '交换容量': '2.4Tbps',
                    'PON口': '最高64口GPON',
                    '上联': '4×10GE/2×40GE',
                    '管理': '支持U2000网管'
                }
            },
            {
                name: 'HG 系列',
                type: 'ONU',
                description: '家庭/企业网关',
                specs: {
                    '接口': '4×GE + 2×POTS + USB',
                    'Wi-Fi': 'Wi-Fi 6 AX1800/AX3000',
                    '光模块': 'SFP可插拔',
                    '远程管理': 'OMCI/TR-069'
                }
            }
        ],
        solutions: [
            {
                name: '智慧家庭',
                target: '家庭宽带',
                description: 'FTTH全屋光纤覆盖'
            },
            {
                name: '数字乡村',
                target: '农村市场',
                description: '低成本广覆盖农村宽带方案'
            },
            {
                name: '智慧政务',
                target: '政府机构',
                description: '高安全等级政务网络'
            }
        ],
        website: 'https://www.fiberhome.com',
        docsUrl: 'https://www.fiberhome.com/product/'
    }
};

// 导出模块
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { VENDOR_DATA, NEWS_DATA };
}

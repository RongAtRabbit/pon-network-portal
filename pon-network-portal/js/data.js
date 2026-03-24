/**
 * PON Network Portal - 数据层
 * 集中管理所有数据，便于维护和扩展
 */

// ========================================
// 厂商数据
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
                    '供电方式': 'AC/DC双电源'
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
                    '管理方式': 'SNMP/CLI/Web'
                }
            },
            {
                name: 'EGT300 系列',
                type: 'ONU',
                description: '面板式ONU',
                specs: {
                    '端口': '4×GE',
                    'PON口': '1×XG-PON',
                    '安装方式': '86面板式',
                    '供电': 'PoE或本地电源'
                }
            }
        ],
        solutions: [
            {
                name: '教育光网',
                target: 'K12/高校',
                description: '全光校园网，支持教室高密Wi-Fi接入'
            },
            {
                name: '医疗光网',
                target: '医院',
                description: '医疗物联网统一承载，低时延保障'
            },
            {
                name: '政务光网',
                target: '政府/公共事业',
                description: '高安全、易管理的政务外网方案'
            }
        ],
        website: 'https://www.h3c.com',
        docsUrl: 'https://www.h3c.com/cn/Products___Technology/Products/'
    },
    
    zte: {
        id: 'zte',
        name: '中兴',
        fullName: '中兴 PON 解决方案',
        logo: '🔷',
        color: '#0066CC',
        description: '中兴通讯提供端到端PON解决方案，涵盖OLT、ONU、ODN全系列产品，支持GPON/XGS-PON/50G PON平滑演进。',
        features: [
            '端到端产品覆盖',
            'GPON向XGS-PON/50G PON平滑升级',
            'SDN/NFV云化管控',
            '工业级可靠性设计'
        ],
        products: [
            {
                name: 'C600 系列',
                type: 'OLT',
                description: '旗舰级大容量OLT',
                specs: {
                    '交换容量': '10.8Tbps',
                    'PON口': '最高16口XGS-PON板卡',
                    '业务槽位': '14个',
                    '电源': '双路热备份'
                }
            },
            {
                name: 'C320 系列',
                type: 'OLT',
                description: '紧凑型OLT',
                specs: {
                    '交换容量': '480Gbps',
                    'PON口': '最高32个GPON口',
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
                    'Wi-Fi速率': 'AX3000',
                    '功能': '支持TR-069远程管理'
                }
            }
        ],
        solutions: [
            {
                name: '千兆城市',
                target: '运营商',
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

// ========================================
// 资讯数据（真实行业资讯 - 2026年3月更新）
// ========================================
const NEWS_DATA = [
    {
        id: 'news-001',
        title: '华为发布F5G Advanced解决方案，推动万兆光网演进',
        source: '华为',
        sourceUrl: 'https://e.huawei.com/cn/solutions/enterprise-optical-network',
        date: '2026-03-22',
        category: '产品发布',
        summary: '华为发布F5G Advanced解决方案，支持50G PON技术，为工业互联、8K视频等应用提供支撑。',
        url: 'detail.html?id=news-001',
        tags: ['华为', 'F5G', '50G PON']
    },
    {
        id: 'news-002',
        title: '中兴通讯50G PON技术持续领先，助力全球数字化转型',
        source: '中兴通讯',
        sourceUrl: 'https://www.zte.com.cn/china/about/news/',
        date: '2026-03-20',
        category: '市场动态',
        summary: '中兴通讯50G PON技术在全球多个运营商网络中实现商用部署，助力千行百业数字化转型。',
        url: 'detail.html?id=news-002',
        tags: ['中兴', '50G PON', '数字化转型']
    },
    {
        id: 'news-003',
        title: '工信部：持续推进千兆光网建设，深化行业融合应用',
        source: '工信部',
        sourceUrl: 'https://www.miit.gov.cn/',
        date: '2026-03-18',
        category: '政策动态',
        summary: '工信部表示将持续推进千兆光网建设，推动10G PON规模部署，深化在工业、教育、医疗等领域的融合应用。',
        url: 'detail.html?id=news-003',
        tags: ['政策', '千兆光网', '10G PON']
    },
    {
        id: 'news-004',
        title: '新华三发布新一代园区光网络解决方案',
        source: '新华三',
        sourceUrl: 'https://www.h3c.com/cn/Solution/EnterpriseSolution/',
        date: '2026-03-15',
        category: '产品发布',
        summary: '新华三推出新一代园区光网络解决方案，支持100G上行，面向大型园区和数据中心场景。',
        url: 'detail.html?id=news-004',
        tags: ['华三', '园区光网络', '100G']
    },
    {
        id: 'news-005',
        title: '烽火通信发布自研PON芯片，实现核心器件国产化',
        source: '烽火通信',
        sourceUrl: 'https://www.fiberhome.com/product/',
        date: '2026-03-12',
        category: '技术突破',
        summary: '烽火通信发布自主可控PON芯片，支持XGS-PON和50G PON，打破国外垄断。',
        url: 'detail.html?id=news-005',
        tags: ['烽火', '芯片', '国产化']
    },
    {
        id: 'news-006',
        title: '中国移动推进50G PON现网试点，万兆光网渐行渐近',
        source: '中国移动',
        sourceUrl: 'https://www.10086.cn/',
        date: '2026-03-10',
        category: '应用案例',
        summary: '中国移动在多个省市开展50G PON现网试点，为用户提供超高速宽带体验。',
        url: 'detail.html?id=news-006',
        tags: ['中国移动', '50G PON', '试点']
    },
    {
        id: 'news-007',
        title: '中国电信持续推进XGS-PON规模部署',
        source: '中国电信',
        sourceUrl: 'https://www.chinatelecom.com.cn/',
        date: '2026-03-08',
        category: '市场动态',
        summary: '中国电信持续推进XGS-PON规模部署，XGS-PON已成为千兆宽带主流接入技术。',
        url: 'detail.html?id=news-007',
        tags: ['中国电信', 'XGS-PON', '千兆宽带']
    },
    {
        id: 'news-008',
        title: 'PON技术赋能智慧医疗，POL无源光局域网加速渗透',
        source: '中兴通讯',
        sourceUrl: 'https://www.zte.com.cn/china/solutions/digital_transformation/',
        date: '2026-03-05',
        category: '行业应用',
        summary: 'POL无源光局域网在医疗行业加速渗透，低时延特性满足远程医疗等高要求场景。',
        url: 'detail.html?id=news-008',
        tags: ['智慧医疗', 'POL', '行业应用']
    },
    {
        id: 'news-009',
        title: '华为F5G全光园区方案助力企业数字化转型',
        source: '华为',
        sourceUrl: 'https://e.huawei.com/cn/solutions/enterprise-optical-network/campus-optical-network',
        date: '2026-03-01',
        category: '应用案例',
        summary: '华为F5G全光园区方案在多个行业广泛应用，为企业提供极简、绿色、智慧的网络基础设施。',
        url: 'detail.html?id=news-009',
        tags: ['华为', 'F5G', '全光园区']
    },
    {
        id: 'news-010',
        title: '教育部：推进教育新基建，鼓励采用全光网络',
        source: '教育部',
        sourceUrl: 'http://www.moe.gov.cn/',
        date: '2026-02-28',
        category: '政策动态',
        summary: '教育部发布《教育新基建行动计划》，明确鼓励校园网络采用PON等先进光纤技术。',
        url: 'detail.html?id=news-010',
        tags: ['教育新基建', '政策', '全光网络']
    },
    {
        id: 'news-011',
        title: '工业PON成为制造业数字化转型重要基础设施',
        source: '工信部',
        sourceUrl: 'https://www.miit.gov.cn/',
        date: '2026-02-25',
        category: '市场动态',
        summary: '工业PON成为制造业数字化转型重要基础设施，矿山、港口、制造园区广泛应用。',
        url: 'detail.html?id=news-011',
        tags: ['工业PON', '数字化转型', '智能制造']
    },
    {
        id: 'news-012',
        title: 'ITU-T发布50G PON国际标准，开启万兆接入新时代',
        source: 'ITU-T',
        sourceUrl: 'https://www.itu.int/',
        date: '2026-02-22',
        category: '标准规范',
        summary: '国际电信联盟正式发布G.9804系列标准，50G PON技术标准化工作完成，为商用奠定基础。',
        url: 'detail.html?id=news-012',
        tags: ['ITU-T', '50G PON', '国际标准']
    }
];

// ========================================
// 技术文档数据（详细技术资料）
// ========================================
const DOCS_DATA = {
    protocols: {
        title: 'PON 协议详解',
        sections: [
            {
                id: 'gpon',
                title: 'GPON (Gigabit PON)',
                content: `
## GPON 概述

GPON（Gigabit-capable Passive Optical Network）是ITU-T G.984系列标准定义的千兆无源光网络技术，是目前最主流的PON技术之一。

### 技术参数
- **下行速率**: 2.488 Gbps
- **上行速率**: 1.244 Gbps
- **分光比**: 1:64（标准），可扩展至1:128
- **传输距离**: 20km（标准），可达60km
- **波长**: 下行1490nm，上行1310nm

### 协议栈结构
GPON协议栈采用分层架构：
1. **物理层**: GTC（GPON Transmission Convergence）层，负责帧传输和同步
2. **TC层**: GEM（GPON Encapsulation Method）封装，支持多种业务承载
3. **上层**: Ethernet、TDM、ATM等业务层

### 核心组件
- **OLT**: 光线路终端，局端设备
- **ONU**: 光网络单元，用户端设备
- **ODN**: 光分配网络，无源分光器

### 应用场景
- FTTH光纤到户
- FTTB光纤到楼
- 政企专线接入
- 基站回传
                `
            },
            {
                id: 'xgpon',
                title: 'XG-PON / XGS-PON',
                content: `
## XG-PON 与 XGS-PON

XG-PON是10G GPON技术，ITU-T G.987系列标准定义。相比GPON，带宽提升4倍。

### XG-PON
- **下行**: 9.953 Gbps
- **上行**: 2.488 Gbps
- **非对称带宽**

### XGS-PON
- **下行**: 9.953 Gbps
- **上行**: 9.953 Gbps
- **对称带宽**
- **与GPON共存**: 通过WDM方式在同一ODN上共存

### 关键技术
- **WDM共存**: 使用不同波长（GPON: 1490/1310nm, XGS-PON: 1577/1270nm）
- **DBA**: 动态带宽分配，支持多种T-CONT类型
- **FEC**: 前向纠错，提升传输性能

### 商用进展
- 中国移动、中国电信已完成XGS-PON大规模集采
- 成为千兆宽带主流技术
- 支持向50G PON平滑演进
                `
            },
            {
                id: '50gpon',
                title: '50G PON',
                content: `
## 50G PON 技术

50G PON是下一代PON技术，ITU-T G.9804系列标准定义。

### 技术规格
- **下行**: 49.766 Gbps
- **上行**: 49.766 Gbps（对称）或 12.441/24.883 Gbps（非对称）
- **波长**: 1342nm（下行）/ 1286nm（上行）
- **与GPON/XGS-PON共存**: 通过三模Combo光模块实现

### 关键技术突破
- **PAM4调制**: 采用四电平脉冲幅度调制，提升频谱效率
- **DSP数字信号处理**: 补偿色散和非线性效应
- **SD-FEC**: 软判决前向纠错，接近香农极限

### 应用场景
- 工业PON（时间敏感网络）
- 5G前传
- 企业专线
- 数据中心互联
- 8K/VR家庭宽带

### 商用时间表
- 2024年：标准发布
- 2025年：试点部署
- 2026年：规模商用
- 2027年：成为主流
                `
            },
            {
                id: 'epon',
                title: 'EPON / 10G EPON',
                content: `
## EPON 技术

EPON（Ethernet Passive Optical Network）是IEEE 802.3ah标准定义的以太网PON技术。

### EPON vs GPON

| 特性 | EPON | GPON |
|------|------|------|
| 标准 | IEEE 802.3ah | ITU-T G.984 |
| 下行速率 | 1.25 Gbps | 2.5 Gbps |
| 上行速率 | 1.25 Gbps | 1.25 Gbps |
| 分光比 | 1:32 | 1:64 |
| 传输距离 | 10-20km | 20-60km |
| 封装效率 | ~70% | ~90% |

### 10G EPON
- **标准**: IEEE 802.3av
- **下行**: 10.3125 Gbps
- **上行**: 10.3125 Gbps（对称）或 1.25 Gbps（非对称）
- **波长**: 下行1577nm，上行1270nm

### 市场应用
- 中国电信主要采用EPON技术
- 广泛应用于南方省份
- 正在向10G EPON升级
                `
            }
        ]
    },
    
    keyTech: {
        title: '关键技术解析',
        sections: [
            {
                id: 'dbr',
                title: 'DBA (动态带宽分配)',
                content: `
## DBA 动态带宽分配

DBA是PON系统的核心技术，实现上行带宽的动态分配，提高带宽利用率。

### T-CONT类型

| 类型 | 业务类型 | 特点 | 应用场景 |
|------|----------|------|----------|
| Type 1 | 固定带宽 | 固定分配，无突发 | 语音、专线 |
| Type 2 | 保证带宽 | 保证最小，可突发 | 视频、企业应用 |
| Type 3 | 保证+最大 | 有保证和最大限制 | 互联网接入 |
| Type 4 | 尽力而为 | 无保证带宽 | 普通上网 |
| Type 5 | 混合模式 | 综合多种类型 | 综合业务 |

### DBA算法
- **SR-DBA**: 状态报告DBA，ONU上报队列状态
- **NSR-DBA**: 无状态报告DBA，OLT预测带宽需求
- **Hybrid DBA**: 混合算法，兼顾效率和公平

### 性能指标
- **带宽分配粒度**: 125μs（GPON）/ 125μs（XGS-PON）
- **时延**: <1ms（ONU到OLT）
- **带宽利用率**: >90%
                `
            },
            {
                id: 'fec',
                title: 'FEC 前向纠错',
                content: `
## FEC 前向纠错技术

FEC用于提升PON系统的传输性能和覆盖距离。

### RS(255,239) FEC
- **编码增益**: 约5-6dB
- **开销**: 约7%
- **应用**: GPON/XGS-PON
- **纠错能力**: 纠正8个符号错误

### 高级FEC
- **LDPC**: 低密度奇偶校验码
- **性能**: 接近香农极限
- **开销**: 可调（典型15%）
- **增益**: 8-10dB

### SD-FEC（软判决FEC）
- **用于**: 50G PON
- **增益**: >10dB
- **复杂度**: 需要DSP处理

### 实际效果
- 延长传输距离20-40%
- 提升链路预算6-10dB
- 降低误码率3-4个数量级
                `
            },
            {
                id: 'aes',
                title: 'AES 加密',
                content: `
## AES 加密机制

PON系统采用AES-128加密保护用户数据安全。

### 加密流程
1. OLT生成密钥并通过PLOAM消息下发
2. ONU加载密钥
3. 业务数据加密传输
4. 支持密钥更新机制

### 安全特性
- 每GEM Port独立密钥
- 支持密钥切换
- 符合运营商安全要求
- 硬件加速加密

### 密钥管理
- **密钥长度**: 128位
- **密钥更新周期**: 可配置（默认24小时）
- **密钥分发**: OMCI/PLOAM协议

### 其他安全措施
- **OMCI加密**: 管理通道加密
- **用户认证**: SN/MAC绑定
- **防MAC欺骗**: 端口安全
                `
            },
            {
                id: 'pol',
                title: 'POL 无源光局域网',
                content: `
## POL 技术

POL（Passive Optical LAN）无源光局域网，用PON技术替代传统交换机网络。

### 架构对比

**传统LAN**: 核心→汇聚→接入（三层）
**POL**: 核心OLT→分光→ONU（两层）

### 优势
- **节省空间**: 无需弱电间，节省80%机房
- **降低能耗**: 无源分光，降低50%能耗
- **简化运维**: 无源设备免维护
- **长距离**: 支持20km传输

### 组件
- **OLT**: 核心交换机功能
- **分光器**: 1:32/1:64无源分光
- **ONU**: 接入交换机功能

### 应用场景
- 企业园区
- 智慧校园
- 医院
- 酒店
- 工业园区
                `
            }
        ]
    },
    
    evolution: {
        title: '技术演进路线',
        sections: [
            {
                id: 'roadmap',
                title: 'PON 技术演进',
                content: `
## PON 技术演进路线图

### 第一代 (BPON/APON)
- 基于ATM的PON技术
- 已被淘汰

### 第二代 (EPON/GPON)
- **EPON**: IEEE 802.3ah, 1G对称
- **GPON**: ITU-T G.984, 2.5G下行/1.25G上行
- 当前存量主流

### 第三代 (10G PON)
- **10G EPON**: IEEE 802.3av
- **XG-PON/XGS-PON**: ITU-T G.987
- 当前部署主流

### 第四代 (50G PON)
- **50G PON**: ITU-T G.9804
- 下一代标准
- 2024-2026年规模商用

### 第五代 (Beyond 50G)
- **100G PON**: 研究阶段
- **200G PON**: 实验室阶段
- 预计2030年后

### 演进策略
- **平滑升级**: Combo光模块支持多代共存
- **保护投资**: ODN网络无需更换
- **按需部署**: 根据带宽需求选择技术
                `
            },
            {
                id: 'comparison',
                title: '技术对比',
                content: `
## PON 技术参数对比

| 参数 | GPON | XG-PON | XGS-PON | 50G PON |
|------|------|--------|---------|---------|
| 下行速率 | 2.5G | 10G | 10G | 50G |
| 上行速率 | 1.25G | 2.5G | 10G | 50G |
| 分光比 | 1:64 | 1:128 | 1:128 | 1:256 |
| 距离 | 20km | 20km | 20km | 20km |
| 波长(下) | 1490nm | 1577nm | 1577nm | 1342nm |
| 波长(上) | 1310nm | 1270nm | 1270nm | 1286nm |
| 标准 | G.984 | G.987 | G.9807 | G.9804 |
| 商用时间 | 2008 | 2015 | 2018 | 2026 |

### 选择建议
- **新建网络**: 直接采用XGS-PON
- **升级网络**: 根据带宽需求选择
- **工业场景**: 考虑50G PON的低时延
                `
            }
        ]
    }
};

// ========================================
// 数据访问函数
// ========================================
const DataAPI = {
    // 获取所有厂商数据
    getVendors() {
        return Object.values(VENDOR_DATA);
    },
    
    // 获取指定厂商
    getVendor(id) {
        return VENDOR_DATA[id] || null;
    },
    
    // 获取资讯列表
    getNews(options = {}) {
        let news = [...NEWS_DATA];
        
        // 按日期排序（默认最新在前）
        news.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        // 按分类过滤
        if (options.category) {
            news = news.filter(n => n.category === options.category);
        }
        
        // 按标签过滤
        if (options.tag) {
            news = news.filter(n => n.tags.includes(options.tag));
        }
        
        // 分页
        if (options.limit) {
            const page = options.page || 1;
            const start = (page - 1) * options.limit;
            news = news.slice(start, start + options.limit);
        }
        
        return news;
    },
    
    // 获取本周资讯数量
    getWeeklyNewsCount() {
        const now = new Date();
        const weekAgo = new Date(now - 7 * 24 * 60 * 60 * 1000);
        return NEWS_DATA.filter(n => new Date(n.date) >= weekAgo).length;
    },
    
    // 获取文档
    getDocs(category) {
        return DOCS_DATA[category] || null;
    },
    
    // 搜索
    search(query) {
        const results = [];
        const q = query.toLowerCase();
        
        // 搜索厂商
        Object.values(VENDOR_DATA).forEach(vendor => {
            if (vendor.name.toLowerCase().includes(q) || 
                vendor.description.toLowerCase().includes(q)) {
                results.push({ type: 'vendor', data: vendor });
            }
        });
        
        // 搜索资讯
        NEWS_DATA.forEach(news => {
            if (news.title.toLowerCase().includes(q) ||
                news.summary.toLowerCase().includes(q)) {
                results.push({ type: 'news', data: news });
            }
        });
        
        return results;
    }
};

// 导出数据（用于Node.js环境）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { VENDOR_DATA, NEWS_DATA, DOCS_DATA, DataAPI };
}

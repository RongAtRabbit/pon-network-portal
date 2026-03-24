/**
 * PON Network Architecture Visualization
 * 交互式PON组网架构可视化组件
 */

class PonArchitectureViewer {
    constructor(containerId, options = {}) {
        this.container = document.getElementById(containerId);
        this.options = {
            vendor: 'huawei', // huawei, h3c, zte, fiberhome
            scenario: 'education', // education, healthcare, enterprise, industrial
            interactive: true,
            ...options
        };
        this.init();
    }

    init() {
        this.render();
        this.bindEvents();
    }

    render() {
        const architectures = {
            huawei: this.getHuaweiArchitecture(),
            h3c: this.getH3cArchitecture(),
            zte: this.getZteArchitecture(),
            fiberhome: this.getFiberhomeArchitecture()
        };

        const arch = architectures[this.options.vendor];
        
        this.container.innerHTML = `
            <div class="arch-viewer">
                <div class="arch-header">
                    <h3>${arch.title}</h3>
                    <p>${arch.subtitle}</p>
                </div>
                <div class="arch-diagram">
                    ${this.renderDiagram(arch.layers)}
                </div>
                <div class="arch-legend">
                    ${this.renderLegend(arch.legend)}
                </div>
                <div class="arch-details">
                    ${this.renderDetails(arch.details)}
                </div>
            </div>
        `;
    }

    getHuaweiArchitecture() {
        return {
            title: '华为 F5G 全光园区架构',
            subtitle: 'POL (Passive Optical LAN) 无源光局域网解决方案',
            layers: [
                {
                    name: '核心层',
                    icon: '🌐',
                    devices: [
                        { name: '核心交换机', model: 'S12700E', type: 'core', desc: '园区核心交换' },
                        { name: 'OLT主设备', model: 'MA5800/EA5800', type: 'olt', desc: '光线路终端' }
                    ]
                },
                {
                    name: '汇聚层 (ODN)',
                    icon: '🔀',
                    devices: [
                        { name: 'ODF配线架', model: 'ODF', type: 'odf', desc: '光纤配线' },
                        { name: '分光器', model: '1:32/1:64', type: 'splitter', desc: '无源分光' }
                    ]
                },
                {
                    name: '接入层',
                    icon: '📡',
                    devices: [
                        { name: 'ONU终端', model: 'OptiXstar', type: 'onu', desc: '光网络单元' },
                        { name: 'Wi-Fi 6 AP', model: 'AirEngine', type: 'ap', desc: '无线接入' }
                    ]
                },
                {
                    name: '终端层',
                    icon: '💻',
                    devices: [
                        { name: '用户终端', model: 'PC/Phone', type: 'terminal', desc: '用户设备' },
                        { name: 'IoT设备', model: 'IoT', type: 'iot', desc: '物联网设备' }
                    ]
                }
            ],
            legend: [
                { color: '#C41E3A', label: '有源设备' },
                { color: '#10b981', label: '无源设备' },
                { color: '#3b82f6', label: '光纤连接' },
                { color: '#f59e0b', label: '终端设备' }
            ],
            details: {
                '核心层': '采用MA5800/EA5800系列OLT，支持XGS-PON，交换容量最高14.4Tbps',
                '汇聚层': '纯无源ODN网络，分光比1:32或1:64，无需供电和机房',
                '接入层': 'OptiXstar系列ONU，支持GE/10GE/Wi-Fi 6多种接口',
                '终端层': '支持PC、手机、打印机、摄像头、IoT传感器等各类终端'
            }
        };
    }

    getH3cArchitecture() {
        return {
            title: '华三 园区光网络架构',
            subtitle: '极简POL架构，汇聚+接入两层设计',
            layers: [
                {
                    name: '核心层',
                    icon: '🌐',
                    devices: [
                        { name: '核心交换机', model: 'S12500', type: 'core', desc: '园区核心' },
                        { name: 'OLT设备', model: 'S7500E-XS', type: 'olt', desc: '光线路终端' }
                    ]
                },
                {
                    name: 'ODN无源层',
                    icon: '🔀',
                    devices: [
                        { name: '光缆交接箱', model: 'OCC', type: 'occ', desc: '光缆交接' },
                        { name: '分光器', model: 'PLC', type: 'splitter', desc: '无源分光' }
                    ]
                },
                {
                    name: '接入层',
                    icon: '📡',
                    devices: [
                        { name: 'ONU交换机', model: 'S5130S-HI', type: 'onu', desc: '光接入交换机' },
                        { name: '面板ONU', model: 'EGT300', type: 'panel', desc: '86面板式' }
                    ]
                },
                {
                    name: '终端层',
                    icon: '💻',
                    devices: [
                        { name: '办公终端', model: 'PC/Phone', type: 'terminal', desc: '办公设备' },
                        { name: '无线AP', model: 'Wi-Fi 6', type: 'ap', desc: '无线接入点' }
                    ]
                }
            ],
            legend: [
                { color: '#E60012', label: '有源设备' },
                { color: '#10b981', label: '无源设备' },
                { color: '#3b82f6', label: '光纤连接' },
                { color: '#f59e0b', label: '终端设备' }
            ],
            details: {
                '核心层': 'S7500E-XS系列OLT，768Gbps交换容量，支持96个XGS-PON口',
                'ODN无源层': '纯无源设计，无需弱电间，节省80%机房空间',
                '接入层': 'S5130S-HI企业级ONU，支持PoE++供电，面板ONU美观隐蔽',
                '终端层': '统一承载数据、语音、视频、物联网等多业务'
            }
        };
    }

    getZteArchitecture() {
        return {
            title: '中兴 云网融合架构',
            subtitle: 'TSN over PON + 云网融合解决方案',
            layers: [
                {
                    name: '云网层',
                    icon: '☁️',
                    devices: [
                        { name: '云核心网', model: 'Cloud Core', type: 'cloud', desc: '云化核心' },
                        { name: 'OLT设备', model: 'C600', type: 'olt', desc: '光线路终端' }
                    ]
                },
                {
                    name: '承载层',
                    icon: '🔀',
                    devices: [
                        { name: 'ODN网络', model: 'ODN', type: 'odn', desc: '光分配网' },
                        { name: 'TSN交换机', model: 'TSN', type: 'tsn', desc: '时间敏感网络' }
                    ]
                },
                {
                    name: '边缘层',
                    icon: '📡',
                    devices: [
                        { name: '工业ONU', model: 'F600', type: 'onu', desc: '工业级ONU' },
                        { name: '边缘计算', model: 'MEC', type: 'mec', desc: '边缘计算节点' }
                    ]
                },
                {
                    name: '终端层',
                    icon: '⚙️',
                    devices: [
                        { name: '工业设备', model: 'PLC/CNC', type: 'industrial', desc: '工业控制' },
                        { name: '传感器', model: 'Sensor', type: 'sensor', desc: '工业传感' }
                    ]
                }
            ],
            legend: [
                { color: '#0066CC', label: '有源设备' },
                { color: '#10b981', label: '无源设备' },
                { color: '#3b82f6', label: '光纤连接' },
                { color: '#8b5cf6', label: 'TSN连接' }
            ],
            details: {
                '云网层': 'C600系列OLT支持云网融合，SDN/NFV架构',
                '承载层': '首创TSN over PON，支持IEEE 802.1Qbv门控调度',
                '边缘层': '工业级ONU支持-40℃~75℃宽温，IP65防护',
                '终端层': '支持PLC、CNC、机器人、AGV等工业设备接入'
            }
        };
    }

    getFiberhomeArchitecture() {
        return {
            title: '烽火 自主可控架构',
            subtitle: '全国产化芯片，自主可控光网络',
            layers: [
                {
                    name: '核心层',
                    icon: '🌐',
                    devices: [
                        { name: '核心交换', model: 'S系列', type: 'core', desc: '国产核心' },
                        { name: 'OLT设备', model: 'AN6000', type: 'olt', desc: '自研OLT' }
                    ]
                },
                {
                    name: 'ODN层',
                    icon: '🔀',
                    devices: [
                        { name: '光交箱', model: 'GJ系列', type: 'occ', desc: '光缆交接' },
                        { name: '分光器', model: '自研PLC', type: 'splitter', desc: '国产分光' }
                    ]
                },
                {
                    name: '接入层',
                    icon: '📡',
                    devices: [
                        { name: 'ONU终端', model: 'HG系列', type: 'onu', desc: '国产ONU' },
                        { name: 'Combo模块', model: '自研', type: 'combo', desc: '三模共存' }
                    ]
                },
                {
                    name: '终端层',
                    icon: '💻',
                    devices: [
                        { name: '办公终端', model: 'PC/Phone', type: 'terminal', desc: '终端设备' },
                        { name: '国产终端', model: '信创', type: 'domestic', desc: '国产化终端' }
                    ]
                }
            ],
            legend: [
                { color: '#00A0E9', label: '国产设备' },
                { color: '#10b981', label: '无源设备' },
                { color: '#3b82f6', label: '光纤连接' },
                { color: '#dc2626', label: '信创终端' }
            ],
            details: {
                '核心层': 'AN6000系列OLT采用自研PON芯片，完全国产化',
                'ODN层': '自研PLC分光器，支持GPON/XGS-PON/50G PON三模',
                '接入层': 'HG系列ONU，自研Combo光模块，平滑演进',
                '终端层': '全面支持国产化信创终端，满足等保要求'
            }
        };
    }

    renderDiagram(layers) {
        return `
            <div class="arch-layers">
                ${layers.map((layer, index) => `
                    <div class="arch-layer" data-layer="${layer.name}">
                        <div class="layer-header">
                            <span class="layer-icon">${layer.icon}</span>
                            <span class="layer-name">${layer.name}</span>
                        </div>
                        <div class="layer-devices">
                            ${layer.devices.map(device => `
                                <div class="device-node" data-device="${device.name}" title="${device.desc}">
                                    <div class="device-icon ${device.type}"></div>
                                    <div class="device-info">
                                        <div class="device-name">${device.name}</div>
                                        <div class="device-model">${device.model}</div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                        ${index < layers.length - 1 ? '<div class="layer-connector">⇅</div>' : ''}
                    </div>
                `).join('')}
            </div>
        `;
    }

    renderLegend(items) {
        return `
            <div class="legend-items">
                ${items.map(item => `
                    <div class="legend-item">
                        <span class="legend-color" style="background: ${item.color}"></span>
                        <span class="legend-label">${item.label}</span>
                    </div>
                `).join('')}
            </div>
        `;
    }

    renderDetails(details) {
        return `
            <div class="details-grid">
                ${Object.entries(details).map(([key, value]) => `
                    <div class="detail-card">
                        <h4>${key}</h4>
                        <p>${value}</p>
                    </div>
                `).join('')}
            </div>
        `;
    }

    bindEvents() {
        if (!this.options.interactive) return;

        // 设备节点悬停效果
        this.container.querySelectorAll('.device-node').forEach(node => {
            node.addEventListener('mouseenter', (e) => {
                this.showDeviceTooltip(e.target);
            });
            node.addEventListener('mouseleave', () => {
                this.hideDeviceTooltip();
            });
        });

        // 层级点击展开详情
        this.container.querySelectorAll('.arch-layer').forEach(layer => {
            layer.addEventListener('click', (e) => {
                this.toggleLayerDetails(e.currentTarget);
            });
        });
    }

    showDeviceTooltip(target) {
        const deviceName = target.dataset.device;
        // 实现tooltip显示逻辑
    }

    hideDeviceTooltip() {
        // 实现tooltip隐藏逻辑
    }

    toggleLayerDetails(layerElement) {
        layerElement.classList.toggle('expanded');
    }

    // 切换厂商
    switchVendor(vendor) {
        this.options.vendor = vendor;
        this.render();
    }

    // 切换场景
    switchScenario(scenario) {
        this.options.scenario = scenario;
        this.render();
    }
}

// 场景化架构图渲染器
class ScenarioArchitectureRenderer {
    static renderEducation() {
        return {
            title: '智慧校园全光网络架构',
            diagram: `
                ┌─────────────────────────────────────────────────────────────┐
                │                      校园网络中心                              │
                │  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐     │
                │  │  核心交换机  │────│    OLT      │────│  服务器群   │     │
                │  │  (S12700)   │    │  (MA5800)   │    │ (认证/网管) │     │
                │  └─────────────┘    └──────┬──────┘    └─────────────┘     │
                └─────────────────────────────┼─────────────────────────────┘
                                              │
                    ┌─────────────────────────┼─────────────────────────┐
                    │                         │                         │
                ┌───┴───┐                 ┌───┴───┐                 ┌───┴───┐
                │ 分光器 │                 │ 分光器 │                 │ 分光器 │
                │ (1:32) │                 │ (1:32) │                 │ (1:32) │
                └───┬───┘                 └───┬───┘                 └───┬───┘
                    │                         │                         │
        ┌───────────┼───────────┐   ┌───────────┼───────────┐   ┌───────┴───────┐
        │           │           │   │           │           │   │               │
    ┌───┴───┐   ┌───┴───┐   ┌───┴───┐   ┌───┴───┐   ┌───┴───┐   ┌───┴───┐   ┌───┴───┐
    │ 教室  │   │ 教室  │   │ 办公室 │   │ 宿舍  │   │ 宿舍  │   │ 图书馆 │   │ 体育馆 │
    │ ONU   │   │ ONU   │   │ ONU   │   │ ONU   │   │ ONU   │   │ ONU   │   │ ONU   │
    └───┬───┘   └───┬───┘   └───┬───┘   └───┬───┘   └───┬───┘   └───┬───┘   └───┬───┘
        │           │           │           │           │           │           │
    ┌───┴───┐   ┌───┴───┐   ┌───┴───┐   ┌───┴───┐   ┌───┴───┐   ┌───┴───┐   ┌───┴───┐
    │Wi-Fi 6│   │电子  │   │办公  │   │FTTR │   │宽带  │   │公共  │   │监控  │
    │  AP   │   │白板  │   │电脑  │   │主光猫│   │接入  │   │Wi-Fi │   │摄像头│
    └───────┘   └───────┘   └───────┘   └───────┘   └───────┘   └───────┘   └───────┘
            `,
            features: [
                '教室：XGS-PON接入 + Wi-Fi 6覆盖，支持智慧课堂',
                '宿舍：FTTR光纤到房间，千兆到桌面',
                '办公室：POL无源光局域网，极简运维',
                '图书馆/体育馆：高密Wi-Fi接入，支持VR/AR应用'
            ]
        };
    }

    static renderHealthcare() {
        return {
            title: '智慧医院全光网络架构',
            diagram: `
                ┌─────────────────────────────────────────────────────────────┐
                │                      医院网络中心                              │
                │  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐     │
                │  │  核心交换机  │────│    OLT      │────│  服务器群   │     │
                │  │  (S12700)   │    │  (MA5800)   │    │ (HIS/PACS)  │     │
                │  └─────────────┘    └──────┬──────┘    └─────────────┘     │
                └─────────────────────────────┼─────────────────────────────┘
                                              │
                    ┌─────────────────────────┼─────────────────────────┐
                    │                         │                         │
            硬切片1 (医疗业务)           硬切片2 (办公业务)           硬切片3 (安防)
                    │                         │                         │
                ┌───┴───┐                 ┌───┴───┐                 ┌───┴───┐
                │ 分光器 │                 │ 分光器 │                 │ 分光器 │
                │ (1:16) │                 │ (1:32) │                 │ (1:64) │
                └───┬───┘                 └───┬───┘                 └───┬───┘
                    │                         │                         │
        ┌───────────┼───────────┐   ┌───────────┼───────────┐   ┌───────┴───────┐
        │           │           │   │           │           │   │               │
    ┌───┴───┐   ┌───┴───┐   ┌───┴───┐   ┌───┴───┐   ┌───┴───┐   ┌───┴───┐   ┌───┴───┐
    │ 护士站 │   │ 诊室  │   │ 手术室 │   │ 行政  │   │ 财务  │   │ 门诊  │   │ 监控  │
    │ ONU   │   │ ONU   │   │ ONU   │   │ ONU   │   │ ONU   │   │ ONU   │   │ ONU   │
    └───┬───┘   └───┬───┘   └───┬───┘   └───┬───┘   └───┬───┘   └───┬───┘   └───┬───┘
        │           │           │           │           │           │           │
    ┌───┴───┐   ┌───┴───┐   ┌───┴───┐   ┌───┴───┐   ┌───┴───┐   ┌───┴───┐   ┌───┴───┐
    │HIS终端│   │PACS   │   │医疗  │   │办公  │   │收费  │   │叫号  │   │安防  │
    │  PC   │   │影像   │   │设备  │   │电脑  │   │系统  │   │系统  │   │监控  │
    └───────┘   └───────┘   └───────┘   └───────┘   └───────┘   └───────┘   └───────┘
            `,
            features: [
                '硬切片隔离：医疗业务/办公业务/安防业务物理隔离',
                'PACS影像：10G带宽支持医学影像高速传输',
                '手术室：确定性时延<1ms，支持远程手术',
                '等保合规：满足医院信息安全等级保护要求'
            ]
        };
    }

    static renderIndustrial() {
        return {
            title: '工业PON网络架构',
            diagram: `
                ┌─────────────────────────────────────────────────────────────┐
                │                      工厂控制中心                              │
                │  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐     │
                │  │  工业交换机  │────│    OLT      │────│  MES服务器  │     │
                │  │  (TSN)      │    │  (C600)     │    │  SCADA系统  │     │
                │  └─────────────┘    └──────┬──────┘    └─────────────┘     │
                └─────────────────────────────┼─────────────────────────────┘
                                              │
                    ┌─────────────────────────┼─────────────────────────┐
                    │                         │                         │
            TSN切片1 (控制)              TSN切片2 (视觉)              切片3 (监控)
                    │                         │                         │
                ┌───┴───┐                 ┌───┴───┐                 ┌───┴───┐
                │ 分光器 │                 │ 分光器 │                 │ 分光器 │
                │ (1:8)  │                 │ (1:16) │                 │ (1:32) │
                └───┬───┘                 └───┬───┘                 └───┬───┘
                    │                         │                         │
        ┌───────────┼───────────┐   ┌───────────┼───────────┐   ┌───────┴───────┐
        │           │           │   │           │           │   │               │
    ┌───┴───┐   ┌───┴───┐   ┌───┴───┐   ┌───┴───┐   ┌───┴───┐   ┌───┴───┐   ┌───┴───┐
    │ 产线1 │   │ 产线2 │   │ 产线3 │   │ 视觉1 │   │ 视觉2 │   │ 仓库  │   │ 门禁  │
    │ONU(TSN)│   │ONU(TSN)│   │ONU(TSN)│   │  ONU  │   │  ONU  │   │  ONU  │   │  ONU  │
    └───┬───┘   └───┬───┘   └───┬───┘   └───┬───┘   └───┬───┘   └───┬───┘   └───┬───┘
        │           │           │           │           │           │           │
    ┌───┴───┐   ┌───┴───┐   ┌───┴───┐   ┌───┴───┐   ┌───┴───┐   ┌───┴───┐   ┌───┴───┐
    │  PLC  │   │  CNC  │   │机器人 │   │工业  │   │工业  │   │AGV  │   │传感器│
    │控制器 │   │机床   │   │  臂   │   │相机  │   │相机  │   │控制 │   │网络  │
                └───────┘   └───────┘   └───────┘   └───────┘   └───────┘   └───────┘   └───────┘
            `,
            features: [
                'TSN over PON：端到端确定性时延<100μs',
                '硬切片：控制/视觉/监控业务物理隔离',
                '工业级ONU：-40℃~75℃宽温，IP65防护',
                '50G PON：支持机器视觉大带宽需求'
            ]
        };
    }
}

// 导出模块
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { PonArchitectureViewer, ScenarioArchitectureRenderer };
}

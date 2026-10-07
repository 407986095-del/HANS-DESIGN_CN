/* Image-led editorial readings for archive cases that have no verified project narrative. */
(() => {
  const text = (cn, en) => ({ cn, en });
  const section = (kind, titleCn, titleEn, bodyCn, bodyEn) => ({
    kind,
    title: text(titleCn, titleEn),
    text: text(bodyCn, bodyEn)
  });
  const reading = (premiseCn, premiseEn, evidenceCn, evidenceEn, clueCn, clueEn, verifyCn, verifyEn) => ({
    premise: text(premiseCn, premiseEn),
    summary: text(evidenceCn, evidenceEn),
    sections: [
      section('evidence', '画面可见', 'Visible in the images', evidenceCn, evidenceEn),
      section('clue', '设计线索', 'Design reading', clueCn, clueEn)
    ],
    internalReview: text(verifyCn, verifyEn)
  });

  window.HSD_CASE_VISUAL_READINGS = {
    'aihua-education-hq': reading(
      '让学习、交流与停留共享一处明亮空间。', 'A bright setting for learning, conversation and pause.',
      '画面中可见长桌、成排座椅、书架、楼梯与大面积窗面，室内绿植也进入视线。', 'Long tables, chairs, shelving, a stair and broad glazing are visible, with planting beyond.',
      '桌椅的重复形成集体活动的秩序，楼梯与开放视线则让不同高度保持联系；这是对画面组织方式的解读。', 'Repeated tables suggest a shared activity zone, while the stair and open view connect levels; this is an interpretation of the image.',
      '若补充项目故事，请确认空间实际用途、设计范围与本人承担的工作。', 'For a fuller project story, confirm the space use, design scope and your role.'
    ),
    'armani-art-apartment-clubhouse': reading(
      '在挑高中，观察光、绿意与停留的关系。', 'Read light, greenery and pause within a tall volume.',
      '图中呈现挑高空间、通高玻璃、竖向绿植，以及围绕休息家具展开的暖色石木表面。', 'The images show a tall volume, full-height glazing, vertical greenery, lounge furniture and warm stone-and-timber surfaces.',
      '高处的自然光与近人尺度的座席形成对照，可能让共享空间同时具有开阔感与停留感；用途仍需项目资料确认。', 'Daylight above contrasts with seating at human scale, potentially balancing openness with a place to linger; the actual program needs confirmation.',
      '请核对会所的功能分区、图组范围及项目正式名称。', 'Confirm the clubhouse zones, image-set scope and official project name.'
    ),
    'bihai-building': reading(
      '以中心构图，建立安定而清晰的起居秩序。', 'A centered composition creates a calm, legible interior.',
      '画面可见近似对称的座席布置、中央圆形装饰、两侧灯具与深色木作背景。', 'The image shows a near-symmetrical seating arrangement, a circular central feature, paired lamps and dark timber behind.',
      '中央焦点与两侧重复元素共同加强轴线感，家具则把观看和交谈的重心留在中部；这是视觉层面的阅读。', 'A central focal point and repeated side elements emphasize an axis, while furniture anchors viewing and conversation in the middle.',
      '如需写成项目介绍，还需核实本人职责、设计内容及图片对应的具体空间。', 'A project description still requires confirmation of your role, design scope and the exact space shown.'
    ),
    'camellia-forest-park': reading(
      '分别阅读园区鸟瞰与室内画面。', 'Read the park aerial and interior views as distinct image groups.',
      '图集中同时可见林地、水面与道路的鸟瞰图，以及带餐桌、座椅、窗面和工作台的室内画面。', 'The gallery includes aerial views of woodland, water and roads, as well as interiors with tables, chairs, windows and a work surface.',
      '园区图可从路径与节点阅读布局；室内图可从家具与窗面阅读停留关系。档案把两个主题合并展示，图像本身不能证明它们属于同一工程或已建成。', 'The park images invite a reading through routes and nodes; the interior images through furniture and windows. Their grouping in the archive does not establish that they belong to one built project.',
      '请核对园区与室内升级是否为同一工程、各图所属主题、设计范围及建成状态。', 'Confirm whether the park and interior upgrade belong to one project, which images belong to each, the design scope and completion status.'
    ),
    'dongguan-palm-garden-villa': reading(
      '从平面关系，观察住宅里的聚合与分散。', 'Read gathering and separation through a residential plan.',
      '平面图显示多个起居区域、餐桌、交通路径，以及与室外绿化相邻的空间边缘。', 'The plan shows several living areas, a dining table, circulation routes and edges next to planting.',
      '圆形餐桌与分散的休息节点形成不同活动重心，通道连接其间；这说明图面关系，不代表实际使用方式。', 'A round dining table and separate lounge nodes suggest distinct activity centers linked by circulation; this describes the plan, not confirmed use.',
      '请核对图纸版本、楼层范围及各空间名称后，再补写户型或家庭需求。', 'Confirm the drawing version, floor coverage and room names before describing the layout or household needs.'
    ),
    'east-tower-office': reading(
      '把展示节点与窗边视线放在同一条阅读线上。', 'Bring display points and window views into one reading.',
      '图中出现多个独立展示台、连续窗面、城市景观和线性照明构成的顶面。', 'The image includes freestanding display plinths, continuous glazing, a city view and linear ceiling lights.',
      '展示台的间距为移动和观看留出节奏，窗边视野则成为另一层背景；画面尚不足以判断这里是否为办公、展陈或复合空间。', 'Spacing between plinths sets a viewing rhythm, with the window view as a second backdrop; the image alone cannot establish whether this is an office, gallery or mixed space.',
      '请确认本组图片的空间名称及其与“东塔办公室”标题的对应关系。', 'Confirm the space shown and how it corresponds to the title “East Tower Office.”'
    ),
    'eko-46f-office': reading(
      '让远景、长桌与顶面共同塑造空间纵深。', 'Let the view, long work surface and ceiling shape depth.',
      '画面可见高层城市远景、横向延展的桌面与陈列、温暖木石色面，以及造型鲜明的顶面照明。', 'A high-rise city view, extended work and display surfaces, warm timber-and-stone tones and sculptural ceiling lighting are visible.',
      '长向布置把视线引向窗边，顶部灯光则在开放空间中建立局部尺度；这是基于构图的可能解读。', 'The long arrangement leads the eye toward the windows, while ceiling light gives scale to the open room; this is a visual interpretation.',
      '若标注楼层、面积或办公室用途，请先与项目原始资料核对。', 'Verify the floor, area and office program against project records before publishing them.'
    ),
    'eko-cambodia-factory-architecture': reading(
      '以院落与低层体量，阅读园区的空间组织。', 'Read a campus through its court and low-rise forms.',
      '鸟瞰画面呈现多组低层建筑、中央开敞区域、规则道路与周边绿化。', 'The aerial view shows several low-rise buildings, a central open area, regular roads and perimeter planting.',
      '建筑组团围绕开敞空间展开，便于从集散与步行联系理解布局；图像不能证明实际生产流程或建成状态。', 'The grouping around an open space invites a reading through gathering and pedestrian links; the image cannot verify production flow or completion.',
      '请核实项目所在国家、建筑用途、设计范围及实际实施情况。', 'Confirm the country, building use, design scope and implementation status.'
    ),
    'eko-headquarters-office': reading(
      '用一条明亮的到达轴线，连接建筑与庭院。', 'A luminous arrival axis connects building and court.',
      '画面中可见中央入口体量、两侧玻璃立面、前景水面与对称延伸的景观边界。', 'A central entrance volume, glazed wings, foreground water and landscape edges extending on both sides are visible.',
      '入口和水景形成连续的视觉方向，可能强化到达感；建筑的真实功能与落成状态仍须另行确认。', 'The entrance and water create a continuous visual direction that may emphasize arrival; actual use and completion require separate confirmation.',
      '请核对项目名称、建筑设计参与范围，以及效果图是否对应最终方案。', 'Confirm the project name, architectural scope and whether the rendering matches the final scheme.'
    ),
    'eko-jiangmen-factory-architecture': reading(
      '以水平界面和水景前场，展开建筑的到达体验。', 'A horizontal facade and water forecourt shape arrival.',
      '图中是一段连续玻璃立面，前方有水面、步道与成片种植，建筑轮廓保持低平延展。', 'A continuous glazed facade sits beyond water, paths and planting, beneath a low, extended roofline.',
      '水面拉开建筑与观看位置的距离，长立面则加强横向尺度；这是从效果图读取的空间关系。', 'Water separates the viewer from the building, while the long facade emphasizes horizontal scale; this is a reading of the rendering.',
      '请确认园区功能、本人设计职责以及景观与建筑的实际分工。', 'Confirm the campus program, your role and the actual division between landscape and building design.'
    ),
    'eko-villa-clubhouse': reading(
      '从屋面、台阶与水岸读出会所的迎接姿态。', 'Read the clubhouse approach through roof, steps and water.',
      '画面显示多坡屋面、横向展开的低层体量、入口台阶、临水边缘和庭院植物。', 'Pitched roofs, a low horizontal mass, entry steps, a waterside edge and courtyard planting appear in the image.',
      '屋檐与台阶共同形成由外至内的过渡，水岸提供另一条观看界面；实际动线和功能需由项目资料验证。', 'Roof edges and steps suggest a transition inward, while the water offers another viewing edge; actual routes and functions need verification.',
      '请核实会所与别墅的具体关系、功能配置和建成情况。', 'Verify how the clubhouse relates to the villa, its program and completion status.'
    ),
    'foshan-sofitel-hotel-suites': reading(
      '用暖色材料与家具组合，描绘客房中的停留层次。', 'Warm materials and furniture define places to pause in a suite.',
      '图中可见套房尺度的床与休息家具，背景有分层面板、柜体和局部灯光，整体色调偏暖。', 'A suite-scale bed and lounge furniture sit against layered panels, cabinetry and localized lighting in a warm palette.',
      '睡眠与休息家具构成不同的停留点，连续饰面把它们纳入同一视觉背景；这不等同于对实际客房配置的确认。', 'Sleeping and lounge furniture suggest distinct places to pause, unified by continuous finishes; this does not confirm the built room arrangement.',
      '请核对客房类型、图组是否为同一套房，以及图片属于效果图还是实景。', 'Confirm the room type, whether images show one suite, and whether they are renderings or photography.'
    ),
    'german-aeg-exhibition-hall': reading(
      '借由框景与陈列，组织从入口进入展厅的视线。', 'Framing and display guide the view into the exhibition space.',
      '画面从深色框架向内取景，两侧可见层架，中央区域有被照亮的陈列界面。', 'A dark frame looks into the space, with shelving at both sides and an illuminated display area in the center.',
      '入口框景将视线集中到展示内容，侧边层架则形成连续背景；参观路线与实际展品未能从单张画面确认。', 'The framed opening focuses attention on the display, while side shelving forms a continuous backdrop; route and exhibits cannot be confirmed from one image.',
      '请确认展厅正式名称、展陈内容及本人参与的设计部分。', 'Confirm the exhibition hall’s official name, displayed content and your design contribution.'
    ),
    'guangzhou-conrad-hotel-rooms': reading(
      '以床后的屏风与光线，建立客房的视觉中心。', 'A screen and light establish the guestroom’s focal point.',
      '画面中床位居中，床后有枝形装饰屏风，左右配置床头灯，空间采用低饱和暖色。', 'The bed is centered beneath a branch-like decorative screen, with bedside lighting and a muted warm palette.',
      '屏风成为床区的背景焦点，灯光将视觉重心落回近人尺度；画面呈现的安排仍需与最终客房资料区分。', 'The screen frames the bed, while lighting returns focus to human scale; the depicted arrangement should not be confused with verified final-room information.',
      '请核实房型、设计范围及图片是否代表最终交付状态。', 'Confirm the room type, design scope and whether the images represent the final delivered state.'
    ),
    'guangzhou-huayuan-office': reading(
      '在高挑空间里，用中轴与两侧楼梯建立秩序。', 'An axis and flanking stairs organize a tall interior.',
      '画面呈现双层高度、居中的深色立面或开口、两侧楼梯，以及木色和浅色表面的对照。', 'The image shows a double-height volume, a central dark wall or opening, flanking stairs and contrasting timber and pale surfaces.',
      '中部视觉焦点与两侧上行路径形成稳定构图，也提示空间存在上下层联系；具体楼层用途不由画面推定。', 'A central focal point and stairs on both sides create a stable composition and suggest a vertical connection; floor uses are not inferred.',
      '请确认该图所示空间的名称、楼梯服务的楼层及项目实际用途。', 'Confirm the space shown, which levels the stairs connect and the project’s actual use.'
    ),
    'guangzhou-nansha-yacht-club': reading(
      '把建筑、泊位与水岸路径放进同一幅景观。', 'Place building, berths and waterside routes in one view.',
      '鸟瞰图中可见临水建筑、多个游艇泊位、岸线步道与周边绿化。', 'The aerial view shows a waterside building, yacht berths, shoreline paths and surrounding planting.',
      '建筑与泊位沿水岸形成连续界面，陆上步道把到达和停留串联起来；具体开放范围与运营方式不能从图中确认。', 'The building and berths form a continuous waterfront edge, with paths linking arrival and pause; access and operation cannot be confirmed from the image.',
      '请确认项目正式范围、公共与专属区域的划分及设计职责。', 'Confirm the official project scope, public versus private areas and design responsibilities.'
    ),
    'guangzhou-private-residence-2021': reading(
      '让庭院绿意成为室外用餐场景的背景。', 'Let courtyard greenery frame an outdoor dining setting.',
      '画面显示户外桌椅、木质地面、围合绿植与带有垂直纹理的背景界面。', 'Outdoor dining furniture, a timber deck, enclosing greenery and a vertically textured backdrop are visible.',
      '座席朝向庭院内部，植物同时提供视觉边界；这种布置可能支持较私密的停留，但使用需求尚未核实。', 'Seating faces inward and planting forms a visual boundary; this may support a more private pause, though user needs are unverified.',
      '请确认庭院与室内的连接方式、项目年份及该图对应的实际范围。', 'Confirm the indoor-outdoor connection, project year and exact scope represented by this image.'
    ),
    'haizhu-1918-industrial-park': reading(
      '以重复竖向构件，塑造园区立面的节奏。', 'Repeated vertical elements set the facade rhythm.',
      '正立面画面中，低层建筑横向展开，立面由重复的红褐色竖向构件与大尺度几何开口组成。', 'The low-rise facade extends horizontally, with repeated reddish vertical fins and large geometric openings.',
      '竖向节奏与整体横向体量形成对比，入口和标识区域则成为识别焦点；材料名称与改造历史并未由画面证明。', 'Vertical rhythm contrasts with the horizontal mass, while the entrance and signage draw focus; material identity and renovation history are not established.',
      '请核实建筑用途、改造范围，以及“1918”在项目名称中的来源。', 'Confirm the building use, renovation scope and the source of “1918” in the project name.'
    ),
    'hubin-hotel': reading(
      '透过竖向格栅，串起大堂里的停留与通行。', 'Vertical screens connect pause and movement in the interior.',
      '图中可见挑高室内、深色竖向格栅、休息座席、墙面画面以及向内延伸的门洞。', 'The image shows a tall interior, dark vertical screens, lounge seating, a wall feature and a doorway leading farther in.',
      '格栅让界面保持层次而非完全封闭，座席与门洞分别提示停留和通行；酒店实际空间名称需要原始资料确认。', 'The screens add layers without fully closing the view, while seating and doorway suggest pause and movement; the hotel space name needs record-based confirmation.',
      '请核实该空间属于湖滨楼的哪一处，以及图组是否包含不同区域。', 'Confirm which space in Hubin Building is shown and whether the image set spans multiple areas.'
    ),
    'zhongshan-daxin-medical-center': reading(
      '从建筑体量与绿化边缘，阅读机构空间的到达界面。', 'Read an institutional arrival through its mass and planted edge.',
      '图组出现高层建筑、低层裙房、圆弧形玻璃转角、道路、水面和周边绿地。', 'The gallery shows a tower, lower podium, curved glazed corner, roads, water and surrounding greenery.',
      '高低体量并置，可能把不同规模的空间组织在同一场地中；仅凭图像无法判断科室、服务流程或建筑是否建成。', 'The juxtaposition of tall and low forms may organize different scales on one site; images cannot establish departments, service flows or completion.',
      '请核验建筑用途与本人职责；资料未核实前，不扩展描述到科室、服务流程或建成状态。', 'Verify the building use and your role; do not infer departments, service flows or completion status without records.'
    ),
    'longyuehang-office': reading(
      '在长向背景中，为办公与会客留出不同焦点。', 'Give work and meeting areas distinct focus along a long backdrop.',
      '画面沿长墙展开，墙面有连续木质纹理与层架，前景为座席，浅色石材界面穿插其中。', 'A long wall combines timber texture and shelving, with seating in the foreground and a pale stone surface interrupting it.',
      '连续背景提供方向感，材质转换形成视觉停顿；家具的具体功能和空间是否属于办公接待区仍待核实。', 'The continuous backdrop gives direction, while changing materials create pauses; furniture use and whether this is an office reception remain unverified.',
      '请确认图片所示空间、材料名称及项目中的实际设计范围。', 'Confirm the space shown, material names and actual design scope.'
    ),
    'mj-physical-examination-center': reading(
      '用柔和曲线与反光地面，组织前台的第一印象。', 'Soft curves and a reflective floor shape the first impression.',
      '画面可见弧形顶面、独立接待台、大面积玻璃，以及映出光线与家具的地面。', 'A curved ceiling, freestanding reception desk, broad glazing and a floor reflecting light and furniture are visible.',
      '接待台的弧线与顶面轮廓相互呼应，可能帮助识别服务入口；具体业务流程不能仅据此推断。', 'The desk and ceiling curves echo each other and may help identify a service point; business processes cannot be inferred from the image alone.',
      '请核实中心名称、服务功能和接待空间的设计边界。', 'Verify the center’s name, services and the design boundary of the reception area.'
    ),
    'nanxi-river-yantou': reading(
      '沿水岸与步行路径，观察场地如何连接。', 'Follow the water and pedestrian routes to read the site.',
      '鸟瞰画面可见河道、水面、桥梁或跨越点、岸边绿地与连续步行路径。', 'The aerial image shows a river, water, bridges or crossings, planted banks and connected pedestrian paths.',
      '水体既形成景观中心，也把路径分成不同岸线段落；具体村落更新内容和历史信息须由可靠资料补充。', 'Water acts as a landscape focus and divides the routes into different edges; village-renewal and historical claims need reliable sources.',
      '请确认案例正式名称、场地位置及改造前后所涵盖的实际内容。', 'Confirm the official case name, location and the actual scope before and after any transformation.'
    ),
    'qilongshan-tourist-resort': reading(
      '在林地与水面之间，辨认度假节点的疏密。', 'Read the spacing of retreat nodes among woodland and water.',
      '鸟瞰图呈现连续树冠、水面、蜿蜒道路，以及散布其间的建筑或活动节点。', 'The aerial view shows tree cover, water, winding roads and buildings or activity nodes dispersed across the site.',
      '建筑节点没有占满画面，路径把它们穿插连接，可能形成由到达到停留的序列；实际用地和运营方式未知。', 'Buildings do not fill the view; paths weave among them, potentially creating a sequence from arrival to pause. Land use and operation are unknown.',
      '请核实节点功能、项目边界和图中道路是否属于最终方案。', 'Verify node functions, project boundaries and whether the roads shown belong to the final scheme.'
    ),
    'qingxi-villa': reading(
      '让餐桌面向庭院，把自然光带入日常场景。', 'Turn the dining table toward the courtyard and daylight.',
      '画面中餐桌靠近通高玻璃，窗外是树木与庭院景色，顶面带有柔和弧线并悬挂多盏吊灯。', 'A dining table sits beside full-height glazing facing trees and a courtyard, beneath a softly curved ceiling and pendant lights.',
      '玻璃把室外景色纳入室内背景，吊灯则为桌面建立独立尺度；季节、朝向和采光表现需现场信息核实。', 'Glazing brings the outdoor view into the room, while pendants give the table its own scale; season, orientation and daylight need on-site verification.',
      '请确认庭院与餐厅的实际关系、朝向及项目所处阶段。', 'Confirm the actual relationship between courtyard and dining room, its orientation and project stage.'
    ),
    'sanlitun-intercontinental-hotel-lobby': reading(
      '同时呈现大堂与客房，读出酒店空间的不同尺度。', 'Read different scales across the lobby and guestrooms.',
      '现有图组既出现床、浴缸与客房休息家具，也出现挑高座席空间；不同画面呈现的空间类型并不完全相同。', 'The current set includes beds, a bathtub and guestroom seating, as well as a tall lounge-like space; the images do not all show the same space type.',
      '客房图像强调私密尺度，挑高空间则更开敞；并置观察可以看出酒店从公共到私密空间的尺度变化。', 'Guestroom images emphasize privacy while the tall lounge feels more open; together they show a shift from public to private scale.',
      '请核对大堂与客房分别对应的设计范围、本人职责，以及图组中不同空间的归属。', 'Confirm the design scope and your role for the lobby and guestrooms, and verify which images belong to each space.'
    ),
    'shanghai-intercontinental-hotel-banquet': reading(
      '让顶部的雕塑性构图成为宴会空间的视觉中心。', 'Let a sculptural ceiling anchor the banquet space.',
      '画面中多个圆桌围绕中央区域布置，顶部有大尺度白色曲面或锥形造型，并配合隐藏灯光。', 'Round tables are arranged around a central area beneath a large white sculptural or conical ceiling with concealed lighting.',
      '桌面布局与顶部造型共同形成聚合中心，光线强化层次；宴会规模和实际活动形式仍不能由效果图确认。', 'The table layout and ceiling form create a shared center, with lighting reinforcing depth; capacity and actual event use are unverified.',
      '请核实宴会厅名称、桌数是否代表最终布置及图片是否为效果图。', 'Confirm the banquet-room name, whether the table count is final and whether the image is a rendering.'
    ),
    'shenzhen-china-resources-show-flat': reading(
      '用低矮家具与城市窗景，保持客厅的轻盈感。', 'Low furniture and a city view keep the living room feeling open.',
      '画面呈现沙发、绿色单椅、茶几、深色木质背景与大面积窗面，窗外可见城市建筑。', 'A sofa, green lounge chair, coffee table, dark timber backdrop and broad windows frame a city view.',
      '家具高度较低，视线可以越过座席延伸至窗外；色彩点缀把注意力留在起居区，但样板间配置不等同于实际交付。', 'Low seating lets the view pass beyond the lounge; an accent color anchors the living area, though a show-flat setup is not proof of delivery.',
      '请核实项目名称、样板间与实际住宅的关系，以及公开图片的授权范围。', 'Confirm the project name, how the show flat relates to the homes and the scope of image rights.'
    ),
    'shenzhen-hyatt-hotel-lobby': reading(
      '借助连续界面与远端亮处，读出进入空间的方向。', 'A continuous edge and a bright distance guide arrival.',
      '图中是一段较长的室内通道，深色竖向构件与木质界面沿路径排列，尽端可见较明亮的窗边区域和座席。', 'A long interior route is lined with dark vertical elements and timber, leading toward a brighter window-side area and seating.',
      '明暗变化与重复构件共同提示行进方向，尽端座席成为视觉停靠点；真实动线和公共开放属性未得到确认。', 'Changing light and repeated elements suggest direction, with seating at the far end as a visual pause; circulation and public access are unverified.',
      '请确认画面所示具体空间是否属于酒店大堂及其最终命名。', 'Confirm whether the space shown is part of the hotel lobby and its final designation.'
    ),
    'shenzhen-nanshan-marriott-hotel': reading(
      '以客房界面细节，呈现酒店空间的私密尺度。', 'Guestroom details express the more private scale of a hotel interior.',
      '现有图片主要呈现床、床头背景、衣柜或隔断、休息家具与局部照明。', 'The images show a bed, headboard wall, wardrobes or screens, lounge furniture and localized lighting.',
      '床、收纳与休息家具共同形成客房的功能层次；这组画面支持对空间关系的观察，不代表酒店其他区域。', 'The bed, storage and lounge furniture define layers within a guestroom; these images support a reading of that space, not other hotel areas.',
      '请以可核实的原始资料确认本人职责与项目范围；仅凭图片不推断酒店其他空间。', 'Verify your role and project scope against original records; do not infer other hotel spaces from these images alone.'
    ),
    'shenzhen-shajing-jiaotang-garden-1602': reading(
      '让窗边城市景观成为客厅构图的一部分。', 'Make the city view part of the living-room composition.',
      '画面中可见组合沙发、茶几、电视墙、整面窗与远处高层建筑，顶面和背景使用深浅材质对比。', 'A sectional sofa, coffee table, media wall, broad window and distant towers sit within contrasting light and dark finishes.',
      '座席面向室内中心，同时保留朝窗的视线；这是画面表达的起居关系，并不能证明房间朝向或实际景观。', 'Seating faces an interior focal point while retaining a view toward the window; this describes the composition, not the actual orientation or outlook.',
      '请确认楼栋与房号的公开名称、图片是否为效果图，以及能否公开展示。', 'Confirm the public project and unit name, whether the image is a rendering and whether it may be shared.'
    ),
    'shunde-liang-villa': reading(
      '从玄关与楼梯，阅读多层住宅的空间次序。', 'Read the sequence of a multi-level residence through its entrance and stair.',
      '方案效果图展示庭院水石、玄关楼梯、公共起居、茶室、餐厨与卧室；项目已由主理人确认完工交付使用。', 'The design renderings show the courtyard, entrance stair, shared living areas, tea room, dining room, kitchen and bedrooms; the principal confirms the project was completed and handed over for use.',
      '玄关与楼梯可作为阅读室内的起点，再观察公共区域之间的材质与视线关系，以及转入卧室后的表达变化。这是图面解读，不代表现场各处与效果图完全一致。', 'The entrance and stair offer a starting point for reading the interior, followed by material and sightline relationships among shared rooms and a quieter expression toward the bedrooms. This is an interpretation of the renderings, not a claim that every built detail matches them.',
      '若要写成真实设计取舍复盘，需补充对应方案页与当时的具体判断。', 'A factual account of design decisions would require the relevant proposal pages and the principal’s specific reasoning.'
    ),
    'taiguhui-office': reading(
      '让重复工位与侧向通道形成清楚的办公秩序。', 'Repeated desks and a side aisle establish workplace order.',
      '画面显示成排工作桌椅、大面积窗面、侧向通道和悬挂线性灯具，隔断框架划分局部区域。', 'Rows of desks, broad glazing, a side aisle and suspended linear lights are visible, with framed partitions defining areas.',
      '工位的重复强化整体秩序，通道与隔断则可能控制流线和视线；团队规模与真实工作模式不由图像推断。', 'Repeated desks reinforce order, while aisles and partitions may shape movement and sightlines; team size and work patterns are not inferred.',
      '请核实楼层、办公团队需求及本人在项目中的具体职责。', 'Verify the floor, workplace brief and your specific responsibilities.'
    ),
    'taohua-spring-art-town': reading(
      '沿着水面与建筑群，观察场景如何逐层展开。', 'Read the scene through water and a sequence of buildings.',
      '图中多组低层坡屋面建筑围绕水面和步道展开，远处可见山形背景，沿线设置照明。', 'Low-rise pitched-roof buildings frame water and paths, with a mountain-like backdrop and lighting along the route.',
      '水面把分散的建筑连接成连续视景，步道提供观看顺序；“艺术小镇”的具体内容和运营状态不能由效果图证明。', 'Water links separate buildings into a continuous view, while paths suggest a viewing sequence; the town’s program and operation are not established by the rendering.',
      '请核实项目正式名称、建筑与景观的设计范围，以及实施状态。', 'Confirm the official project name, building and landscape scopes, and implementation status.'
    ),
    'tiande-plaza-42f': reading(
      '从几何顶面与城市窗景，读出室内的聚焦方式。', 'Read an interior focal point through geometry and city views.',
      '代表图呈现大尺度几何格栅顶面、弧形框景、中央吧台、座席和城市窗景。', 'The cover shows a geometric lattice ceiling, arched framing, a central bar, seating and a city view.',
      '中央吧台成为空间焦点，格栅与拱形界面形成包裹感；仅凭代表图无法确定它在广场中的楼层或实际功能。', 'The bar anchors the scene, while lattice and arches create enclosure; the image alone cannot establish its floor or actual function within the plaza.',
      '请确认“天德广场”所指的具体空间，是否应补充楼层或功能名称。', 'Confirm the specific space meant by “Tiande Plaza” and whether its floor or function should be named.'
    ),
    'tianmu-lake-wei-hotel-rooms': reading(
      '以通高界面与浴缸，组织客房里的私密层次。', 'A tall partition and bath organize private layers in the room.',
      '图中可见独立浴缸、通高格栅或屏风、床边休息区、柜体与多层暖色照明。', 'A freestanding tub, tall screen, bedside lounge, cabinetry and layered warm lighting are visible.',
      '屏风在保持通透感的同时区分不同活动区域，灯光沿高处与近地面分布；实际房型与设备配置仍需确认。', 'The screen separates activities while preserving openness, and lighting spans high and low levels; room type and fixtures need confirmation.',
      '请核实客房名称、套型与图片是否对应同一房间。', 'Confirm the guestroom name, room type and whether the images show one room.'
    ),
    'trumpchi-ground-floor': reading(
      '围绕长桌布置座席，并以品牌画面形成背景焦点。', 'Arrange seating around a long table with a branded visual backdrop.',
      '图中有长会议桌、多把座椅、墙面车辆展示屏与大面积玻璃隔断，顶面采用连续灯带。', 'A long meeting table, multiple chairs, a vehicle display screen, broad glazing and continuous ceiling lights are visible.',
      '桌椅指向集中讨论的可能性，车辆画面成为背景焦点；图像本身不足以确认这里是办公、展示还是接待空间。', 'The table may support group discussion, with the vehicle image as a focal backdrop; the image cannot confirm whether this is an office, display or reception space.',
      '请核实“首层”的具体空间功能、品牌授权用法及本人负责内容。', 'Confirm the ground-floor function, permitted brand references and your design contribution.'
    ),
    'trumpchi-special-store': reading(
      '以通透立面展示车辆，并让到达界面保持开阔。', 'Display vehicles behind a transparent facade and open approach.',
      '外观图显示大面积玻璃展示面、深色水平檐口、室内车辆与宽阔前场，背景为低角度日光。', 'The exterior shows a broad glazed display, dark horizontal roof edge, vehicles inside and an open forecourt in low sunlight.',
      '透明界面让车辆成为外部可见的展示内容，前场则留出接近建筑的空间；实际营业、品牌授权或建成状态未由图像确认。', 'The transparent facade makes vehicles visible from outside, with an open approach; operation, brand authorization and completion are unverified.',
      '请确认门店正式名称、品牌标识使用许可及图片与实际门店的对应关系。', 'Confirm the store’s official name, permission to use brand marks and whether images match a built store.'
    ),
    'xiamen-luxury-collection-hotel-restaurant': reading(
      '沿着服务台与座席，观察餐饮空间的前后关系。', 'Read the restaurant sequence through service counters and seating.',
      '图中可见连续服务台、后方层架与材质墙面、两侧座席，以及靠近立面的绿植和自然光。', 'Continuous service counters, rear shelving and textured walls, side seating, planting and daylight are visible.',
      '服务界面位于视线中心，座席分布在两侧，形成清晰的前后层次；菜品、服务方式和营业状态不能从图中推定。', 'The service counter anchors the view while seating on both sides creates depth; cuisine, service style and operation cannot be inferred.',
      '请确认餐厅名称、图组是否覆盖同一餐饮区域及设计责任范围。', 'Confirm the restaurant name, whether the set covers one dining area and the design scope.'
    ),
    'xian-hualuxe-intercontinental-hotel': reading(
      '从入口雨棚与玻璃体量，阅读酒店的到达界面。', 'Read the hotel arrival through canopy and glazed volumes.',
      '外观画面呈现高层玻璃体量、低层入口雨棚、开敞铺地、树木与前场道路。', 'The exterior shows glazed towers, a low entrance canopy, open paving, trees and an approach road.',
      '低层入口与高层体量在尺度上形成对照，前场为到达提供视觉留白；图像不能证明落成状态或实际交通组织。', 'The entrance contrasts in scale with the towers, while the forecourt creates visual breathing room; completion and traffic arrangements are not verified.',
      '请确认展示的是整体建筑、酒店入口还是某个分项，并核对项目正式名称。', 'Confirm whether this shows the whole building, hotel entrance or a specific component, and verify the official name.'
    ),
    'xinghewan-huixin-garden-xx': reading(
      '以床边工作位与整墙收纳，连接休息和日常使用。', 'Connect rest and daily use through a bedside desk and storage wall.',
      '卧室画面中可见床、靠窗桌椅、整墙柜体、开放层架与嵌入式灯光。', 'The bedroom image shows a bed, desk and chair by the window, full-height cabinetry, open shelving and integrated lighting.',
      '桌面与床位共享同一侧采光，柜体为画面提供连续背景；实际收纳容量和居住者需求无法从效果图核实。', 'Desk and bed share the window-side light, while cabinetry creates a continuous backdrop; storage capacity and resident needs cannot be verified from a rendering.',
      '请确认房号是否适合公开、图片是否属于同一户型及设计范围。', 'Confirm whether the unit number may be public, whether images show one unit and the design scope.'
    ),
    'zhuhai-baikang-ningqiaowan-medical-education': reading(
      '从建筑群与水绿边界，观察机构场地的整体关系。', 'Read an institutional site through its buildings, water and green edge.',
      '鸟瞰画面可见多组塔楼和低层体量、弧形连接界面、水面、道路与大面积林地。', 'The aerial image shows towers and low-rise forms, curved links, water, roads and extensive woodland.',
      '建筑群与绿地交织，可能形成多个相互联系的场地节点；具体医疗、教育功能分布不能只凭效果图确认。', 'Buildings and greenery interweave into potentially connected site nodes; specific medical or educational functions cannot be confirmed from a rendering alone.',
      '请核实项目正式名称、医疗与教育功能边界、地点和本人职责。', 'Verify the official project name, medical and educational scope, location and your role.'
    ),
    'zhuhai-intercontinental-hotel-lobby': reading(
      '用长向顶面与临窗座席，形成开放的大堂视线。', 'A long ceiling and window-side seating open the lobby view.',
      '画面可见大尺度连续顶面、纵深铺地、临窗座席、绿植与贯穿空间的落地玻璃。', 'A broad continuous ceiling, deep floor plane, window-side seating, planting and full-height glazing are visible.',
      '顶面线条引导视线向远端延伸，座席与窗景为行进路线提供停留节点；服务动线与实际空间边界仍待核实。', 'Ceiling lines lead the eye into the distance, while seating and views offer places to pause; service routes and actual boundaries need verification.',
      '请确认大堂的具体区域、图片对应的设计范围及项目交付状态。', 'Confirm the lobby area shown, design scope represented and project delivery status.'
    )
  };
})();

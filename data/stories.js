/* Editorial readings of existing imagery; not retrospective claims about the brief or construction. */
(() => {
  const text = (cn, en) => ({ cn, en });
  const section = (cn, en, bodyCn, bodyEn) => ({ title: text(cn, en), text: text(bodyCn, bodyEn) });
  window.HSD_STORIES = {
    'zhonglv-jiulonghu-villa': {
      premise: text('让庭院，成为起居空间的另一面。', 'Let the courtyard become another side of the living room.'),
      sections: [
        section('空间课题', 'The question', '当室内面向庭院，边界可以如何既保持围合，又让视线向外延伸？这组画面提供了一个关于内外关系的阅读起点。', 'How can a room retain its enclosure while opening its view to a courtyard? These images offer a starting point for reading that relationship.'),
        section('关键观察', 'The observation', '大幅玻璃将植物与石墙引入视野。沙发、单椅与茶几形成相对低矮的围坐关系，让视线从家具上方继续走向庭院。', 'Broad glazing brings planting and the stone wall into view. Low seating lets the eye travel across the furniture toward the courtyard.'),
        section('细节关系', 'The detail', '浅色地面、木饰面与石材形成温差与肌理对照。阅读时可以留意：自然光如何同时呈现石材的硬度与织物的柔软。', 'Pale flooring, timber and stone establish a dialogue of tone and texture. Notice how daylight reveals both the solidity of stone and the softness of fabric.')
      ]
    },
    'zhonglv-rose-lake-detached-villa': {
      premise: text('沿着楼梯，读懂空间的纵深。', 'Read the depth of a room through its stair.'),
      sections: [
        section('空间课题', 'The question', '起居空间与上下层之间，如何建立清楚而不突兀的联系？楼梯在这里也是理解空间纵深的线索。', 'How do living spaces connect to another level without an abrupt break? The stair becomes a way of reading depth.'),
        section('关键观察', 'The observation', '画面从前景的沙发与茶几，延伸至后方楼梯。前后层次与家具的水平线，共同引导视线。', 'The view moves from the foreground seating and table to the stair beyond. Horizontal furniture lines reinforce that sequence.'),
        section('细节关系', 'The detail', '深浅材质与局部照明交替出现，构成有节制的明暗关系。可以从扶手、踏步和墙面的交接处继续观察。', 'Alternating material tones and localized lighting produce a restrained rhythm. Look more closely at the meeting of handrail, tread and wall.')
      ]
    },
    'shenzhen-qiaocheng-no1-villa-01': {
      premise: text('把相聚的重心，留给一张餐桌。', 'Make the dining table the centre of gathering.'),
      sections: [
        section('空间课题', 'The question', '开放的餐厨空间里，如何让不同活动拥有各自的重心？可以从餐桌与岛台的位置关系开始阅读。', 'How can different activities find their own centre in an open dining space? Begin with the relationship of table and island.'),
        section('关键观察', 'The observation', '餐桌位于画面中心，岛台与背景柜体形成侧面和后方的边界。家具的布置使空间层次更易辨认。', 'The dining table anchors the composition, with the island and cabinetry defining its side and rear edges.'),
        section('细节关系', 'The detail', '木色背景、浅色石材和细线灯具之间保留了清楚的轻重对比。局部照明为器物与台面提供另一层细节。', 'Timber, pale stone and slender lighting establish a contrast of visual weight. Local lighting adds a second layer around objects and surfaces.')
      ]
    },
    'guangzhou-luhu-mingxuan-villa-01': {
      premise: text('在挑高之中，找回日常的尺度。', 'Find an everyday scale within a tall room.'),
      sections: [
        section('空间课题', 'The question', '挑高空间的开阔感，如何与围坐交流需要的亲近感并存？这组画面的高低关系值得细看。', 'How can the openness of a tall room coexist with the intimacy of gathering? Look at the contrast between its high and low elements.'),
        section('关键观察', 'The observation', '高窗与竖向墙面强调空间高度，座椅与茶几则将活动重心放回地面附近。两种尺度同时存在。', 'Tall windows emphasize height, while seating and tables bring the centre of activity close to the floor.'),
        section('细节关系', 'The detail', '悬挂灯具连接上下层次，窗外植物提供柔和的视觉背景。可以沿着窗、灯和家具之间的关系继续阅读。', 'Suspended lighting bridges the vertical space, with planting beyond the window as a soft backdrop. Follow the relationship between window, light and furniture.')
      ]
    },
    'congdu-international-manor-villa': {
      premise: text('从起居到餐桌，阅读一个连续的室内画面。', 'Read a continuous interior view from seating to dining.'),
      sections: [
        section('空间课题', 'The question', '封面画面把沙发、茶几与后方餐桌放在同一视野内，可以从前后层次阅读空间。', 'The cover image places sofas, a coffee table and a dining table in one view, inviting a reading from foreground to background.'),
        section('关键观察', 'The observation', '浅色座席位于前景，深色餐桌位于后方；灯具和木饰面让两个区域保持视觉联系。', 'Pale seating occupies the foreground and a darker dining table sits behind; lighting and timber surfaces connect the two visually.'),
        section('细节关系', 'The detail', '地面石材、织物与木面呈现不同肌理。这些是图面可见的关系，不能据此推断实际使用或交付状态。', 'Stone flooring, textiles and timber present different textures. These are visible relationships, not evidence of use or completion.')
      ]
    },
    'pazhou-no1-detached-villa': {
      premise: text('从座席到大屏幕，阅读一处视听空间。', 'Read a media room from seating to screen.'),
      sections: [
        section('空间课题', 'The question', '封面中，弧形沙发面向右侧大屏幕；前方长台与高脚凳形成另一层停留位置。', 'In the cover image, a curved sofa faces a large screen on the right, while a counter and stools form another place to sit in front.'),
        section('关键观察', 'The observation', '沙发、茶几与屏幕建立观看方向，顶面凹槽和周边灯带沿房间边缘延伸。', 'Sofa, tables and screen establish a viewing direction; a recessed ceiling and perimeter lighting trace the room edges.'),
        section('细节关系', 'The detail', '暖光与深色家具共同压低画面的视觉重心。图像可说明空间表达，不能证明实际影音设备或使用效果。', 'Warm light and dark furniture lower the visual centre of gravity. The image describes a spatial expression, not the installed media system or its performance.')
      ]
    },
    'pazhou-no1-villa-02': {
      premise: text('让秩序，藏在光与格栅之间。', 'Discover order between light and screens.'),
      sections: [
        section('空间课题', 'The question', '如何在保持视线连续的同时，读出空间的边界？竖向构件提供了一种观察角度。', 'How can a boundary remain legible without interrupting the view? Vertical elements offer one way to read it.'),
        section('关键观察', 'The observation', '画面中的竖向线条与家具的水平关系形成对照。视线穿过层次，进入更远处的空间。', 'Vertical lines contrast with the horizontal arrangement of furniture, allowing the eye to travel into the space beyond.'),
        section('细节关系', 'The detail', '木色、浅色家具与装饰灯具构成不同的视觉重量。阅读时可比较结构性的线条和装饰性的线条。', 'Timber tones, pale furniture and decorative lighting carry different visual weights. Compare structural lines with decorative ones.')
      ]
    },
    'black-cow-villa': {
      premise: text('沿着中轴，阅读立面与前庭。', 'Read the facade and forecourt along the central axis.'),
      sections: [
        section('空间课题', 'The question', '封面画面可从前景大门，经过台阶与入口，读到上层露台。', 'The cover image can be read from the foreground gate, across the steps and entrance, to the upper terrace.'),
        section('关键观察', 'The observation', '中央入口两侧有成组的窗、露台与树木，檐口和栏杆的水平线加强立面的层次。', 'Grouped windows, terraces and trees flank the central entrance; roof edges and railings reinforce the facade layers.'),
        section('细节关系', 'The detail', '黄昏光线与建筑照明共同突出入口和树木。这是画面观察，不能据此判断建筑是否已建成。', 'Dusk light and architectural lighting emphasize the entrance and trees. This is an image observation, not evidence that the building was constructed.')
      ]
    },
    'hong-kong-villa': {
      premise: text('从立面到庭院，阅读外部空间层次。', 'Read the exterior layers from facade to garden.'),
      sections: [
        section('空间课题', 'The question', '封面同时出现建筑立面、左侧水面和右侧带顶架的座席，可据此阅读室内外的视觉关系。', 'The cover shows a facade, water on the left and seating beneath a pergola on the right, allowing a reading of the interior and exterior views.'),
        section('关键观察', 'The observation', '多层露台、竖向窗和底层门窗形成不同高度的开口；前庭铺地将视线引向入口。', 'Terraces, tall windows and ground-floor openings sit at different heights, while paving leads the eye toward the entrance.'),
        section('细节关系', 'The detail', '立面照明与庭院树木在黄昏画面中相互衬托；项目地点、建成状态与水景实施情况仍需原件核实。', 'Facade lighting and garden trees sit together in the dusk image; location, completion and installation of the water feature still require project records.')
      ]
    }
  };
  // The featured data and complete archive use two IDs for the same project.
  window.HSD_STORIES['pazhou-no1-villa'] = window.HSD_STORIES['pazhou-no1-villa-02'];
})();

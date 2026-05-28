const recipes = [
  {
    id: 'recipe_tomato_egg',
    name: '番茄炒蛋',
    coverImage: '/assets/images/tomato-egg.svg',
    description: '鸡蛋嫩、番茄出汁，适合新手独立完成的第一道家常菜。',
    difficulty: 1.5,
    timeMinutes: 20,
    serving: '1-2人份',
    categories: ['快手菜', '下饭菜', '一人食'],
    tags: ['新手第一道菜', '下饭', '食材少', '可补救'],
    suitableUsers: ['第一次独立做饭的人', '只会煮面或煎蛋的人', '想做简单一人食的人'],
    coreTips: ['鸡蛋八成熟先盛出', '番茄炒出汁后再回蛋', '调味少量多次'],
    status: 'published',
    sortOrder: 1,
    ingredients: [
      {
        id: 'ingredient_tomato',
        name: '番茄',
        amount: '2个，中等大小',
        type: '主食材',
        required: true,
        description: '提供酸甜味和汤汁',
        selectionTips: {
          preferred: ['颜色红但不发黑', '手感略软有弹性', '表皮完整没有裂口', '拿起来有重量'],
          avoid: ['特别硬且偏青', '表面有黑斑', '明显软烂', '有异味'],
          simpleRule: '要红、要沉、要微微软，不要青硬、不要破皮。'
        },
        substitutes: ['圣女果 8-10 个：更甜但汁少，需要多切几个']
      },
      {
        id: 'ingredient_egg',
        name: '鸡蛋',
        amount: '2-3个',
        type: '主食材',
        required: true,
        description: '提供香气和蛋白质',
        selectionTips: {
          preferred: ['蛋壳完整无裂纹', '没有明显异味', '摇晃时没有明显水声'],
          avoid: ['蛋壳破损', '表面很脏且有异味', '过期或来源不明'],
          simpleRule: '壳完整、没异味、不过期。'
        },
        substitutes: ['土鸡蛋 2 个：香味更浓，但个头可能偏小']
      },
      {
        id: 'ingredient_scallion',
        name: '葱花',
        amount: '少量',
        type: '增香',
        required: false,
        description: '增加香味，可不放',
        selectionTips: {
          preferred: ['颜色翠绿', '叶片不发黄', '根部没有腐烂'],
          avoid: ['叶子明显发黄', '摸起来黏滑', '有腐烂味'],
          simpleRule: '要绿、要挺、不要黏。'
        },
        substitutes: ['不放也可以：不会影响成菜成功']
      },
      {
        id: 'ingredient_salt',
        name: '盐',
        amount: '1/2小勺',
        type: '调味料',
        required: true,
        description: '基础咸味',
        selectionTips: {
          preferred: ['普通食盐即可', '提前放在手边', '用小勺量取'],
          avoid: ['凭感觉一大把倒入', '边炒边找盐', '一次放太多'],
          simpleRule: '少量先放，不够再补。'
        },
        substitutes: ['生抽 1 小勺：会增加颜色和鲜味，盐要少放']
      },
      {
        id: 'ingredient_sugar',
        name: '糖',
        amount: '1/3-1小勺',
        type: '调味料',
        required: false,
        description: '平衡番茄酸味',
        selectionTips: {
          preferred: ['白糖或细砂糖都可以', '先少放', '酸味明显再补'],
          avoid: ['一次放满一大勺', '没有尝味就连续加', '用代糖替代后还按原量放'],
          simpleRule: '糖是修酸味的，先少后补。'
        },
        substitutes: ['不放也可以：成品会更偏酸']
      }
    ],
    tools: ['炒锅', '锅铲', '菜刀', '砧板', '碗', '盘子', '小勺'],
    prepSteps: [
      {
        id: 'prep_step_tomato',
        title: '先处理番茄',
        action: '洗净番茄，去蒂，切成 2-3cm 小块。',
        reason: '番茄切好后不容易马上变差，适合先准备。',
        completionState: '番茄已切块，放在盘中备用。',
        estimatedMinutes: 3
      },
      {
        id: 'prep_step_scallion',
        title: '再切葱花',
        action: '葱洗净后切成小圈，只需要一小撮。',
        reason: '葱花用量少，提前切好可以避免下锅时手忙脚乱。',
        completionState: '葱花放在碗边或小碟里。',
        estimatedMinutes: 1
      },
      {
        id: 'prep_step_egg',
        title: '最后打鸡蛋',
        action: '鸡蛋打入碗中，加一小撮盐，打到蛋黄蛋清基本融合。',
        reason: '蛋液放太久会分层，所以建议最后处理。',
        completionState: '看不到明显大块透明蛋清。',
        estimatedMinutes: 2
      },
      {
        id: 'prep_step_seasoning',
        title: '调料放手边',
        action: '把盐、糖、油和小勺放在灶台旁，确认能顺手拿到。',
        reason: '开火后再找调料容易错过最佳状态。',
        completionState: '不用离开灶台就能拿到调料。',
        estimatedMinutes: 1
      },
      {
        id: 'prep_step_plate',
        title: '准备空盘子',
        action: '准备一个空盘，用来临时盛出炒到八成熟的鸡蛋。',
        reason: '鸡蛋先盛出，能避免回锅前被炒老。',
        completionState: '空盘在锅旁边，锅铲能直接把鸡蛋盛进去。',
        estimatedMinutes: 1
      }
    ],
    cookingSteps: [
      {
        id: 'cook_step_1',
        title: '热锅',
        action: '开中火，把空锅加热 30-45 秒。',
        heatLevel: '中火',
        estimatedTime: '30-45秒',
        stateJudgements: ['手离锅面 10cm 能感觉到热气', '锅底没有水珠', '没有冒烟'],
        nextStepCondition: '锅热但没有明显冒烟时倒油。',
        beginnerTips: ['不要冷锅直接倒蛋液', '如果锅开始冒烟，先关火等 10 秒'],
        mistakes: ['锅没热就倒蛋，鸡蛋容易粘锅', '锅冒烟后继续加热，鸡蛋容易焦'],
        rescues: ['锅太热时先关火，把锅离灶 10 秒再倒油']
      },
      {
        id: 'cook_step_2',
        title: '倒油炒鸡蛋',
        action: '倒入 1.5 汤勺油，转中大火，倒入蛋液。',
        heatLevel: '中大火',
        estimatedTime: '20-40秒',
        stateJudgements: ['蛋液边缘开始凝固', '中间还有一点湿润', '鸡蛋颜色是嫩黄色'],
        nextStepCondition: '鸡蛋大部分成块但表面略湿时盛出。',
        beginnerTips: ['蛋液下锅后不要马上乱搅', '不要炒到完全干，后面还会回锅'],
        mistakes: ['鸡蛋炒到干硬', '一直搅导致鸡蛋太碎'],
        rescues: ['鸡蛋偏老也能继续做，后面回锅时间缩短到 10 秒内']
      },
      {
        id: 'cook_step_3',
        title: '盛出鸡蛋',
        action: '用锅铲把鸡蛋推到盘子里，锅里留一点油。',
        heatLevel: '关火或小火',
        estimatedTime: '15-25秒',
        stateJudgements: ['鸡蛋大块成形', '表面还有一点湿润', '盘子就在手边'],
        nextStepCondition: '鸡蛋离锅后继续炒番茄。',
        beginnerTips: ['先盛出是为了防止鸡蛋变老', '锅里有一点蛋碎不用清理'],
        mistakes: ['鸡蛋留在锅里等番茄，会被炒老', '盛出动作太慢导致锅底变焦'],
        rescues: ['动作慢了就先关火，盛完再重新开火']
      },
      {
        id: 'cook_step_4',
        title: '补油',
        action: '锅中补 0.5 汤勺油，开中火加热 10 秒。',
        heatLevel: '中火',
        estimatedTime: '10-15秒',
        stateJudgements: ['锅底有薄薄一层油', '油面轻微流动', '没有明显冒烟'],
        nextStepCondition: '油热后下葱花或直接下番茄。',
        beginnerTips: ['油不用多，番茄会出汁', '怕油溅就先把番茄水分沥一下'],
        mistakes: ['油太多导致成品腻', '油太热下番茄时飞溅'],
        rescues: ['油太多可以用锅铲推到锅边，最后少盛一点汤汁']
      },
      {
        id: 'cook_step_5',
        title: '下葱花',
        action: '放入葱花，快速翻 2-3 下，闻到香味就继续。',
        heatLevel: '中火',
        estimatedTime: '5-10秒',
        stateJudgements: ['葱花颜色仍然偏绿', '能闻到葱香', '没有变黑'],
        nextStepCondition: '葱香出来后马上下番茄。',
        beginnerTips: ['葱花很容易糊，不要单独炒太久', '不放葱也可以直接跳到番茄'],
        mistakes: ['葱花炒黑变苦', '火太大导致葱花焦'],
        rescues: ['葱花焦了就挑出明显发黑的部分，再下番茄']
      },
      {
        id: 'cook_step_6',
        title: '下番茄',
        action: '倒入番茄块，翻炒让每块番茄都接触锅底。',
        heatLevel: '中火',
        estimatedTime: '60-90秒',
        stateJudgements: ['番茄边缘开始变软', '锅底出现少量红色汁水', '番茄皮略微卷起'],
        nextStepCondition: '看到明显汁水后开始调味。',
        beginnerTips: ['不要急着加水，先等番茄自己出汁', '锅太干可以沿锅边加 1 汤勺水'],
        mistakes: ['番茄还硬就回蛋，味道会分离', '一直大火导致锅底糊'],
        rescues: ['番茄不出汁就加 1 汤勺水，盖锅 30 秒']
      },
      {
        id: 'cook_step_7',
        title: '加盐糖炒出汁',
        action: '加入 1/2 小勺盐和 1/3 小勺糖，继续翻炒。',
        heatLevel: '中火',
        estimatedTime: '60-120秒',
        stateJudgements: ['番茄明显变软', '锅底有红色汤汁', '酸味闻起来没那么冲'],
        nextStepCondition: '汤汁能薄薄铺满锅底时回鸡蛋。',
        beginnerTips: ['盐能帮助番茄出汁', '糖先少放，最后还可以补'],
        mistakes: ['一次放太多盐', '番茄还没出汁就回蛋'],
        rescues: ['太咸可补 2-3 汤勺水并多炒 30 秒，盛盘时少带汤']
      },
      {
        id: 'cook_step_8',
        title: '鸡蛋回锅',
        action: '倒回鸡蛋，用锅铲轻轻翻，让鸡蛋裹上番茄汁。',
        heatLevel: '中小火',
        estimatedTime: '20-40秒',
        stateJudgements: ['鸡蛋表面沾到番茄汁', '鸡蛋没有继续变干', '锅底仍有少量汤汁'],
        nextStepCondition: '鸡蛋和番茄混合均匀后尝味。',
        beginnerTips: ['回锅只需要短时间', '动作轻一点，避免鸡蛋碎成渣'],
        mistakes: ['回锅炒太久导致鸡蛋变老', '用力压碎鸡蛋'],
        rescues: ['鸡蛋偏干时加 1 汤勺水，快速翻匀后出锅']
      },
      {
        id: 'cook_step_9',
        title: '最后调味',
        action: '尝一点汤汁，按味道少量补盐或糖。',
        heatLevel: '小火',
        estimatedTime: '20-30秒',
        stateJudgements: ['咸味够但不齁', '酸甜比较平衡', '汤汁不是清水状'],
        nextStepCondition: '味道合适后准备出锅。',
        beginnerTips: ['一次只补一点点', '不确定就宁愿淡一点'],
        mistakes: ['连续加盐导致太咸', '为了变甜放太多糖'],
        rescues: ['太酸补少量糖，太甜补少量盐，太咸补番茄或水']
      },
      {
        id: 'cook_step_10',
        title: '出锅',
        action: '关火，把番茄炒蛋盛到盘子里。',
        heatLevel: '关火',
        estimatedTime: '20-30秒',
        stateJudgements: ['鸡蛋嫩黄不焦黑', '番茄软但不是完全糊状', '盘底有少量红色汤汁'],
        nextStepCondition: '盛盘后即可食用。',
        beginnerTips: ['关火后再慢慢盛，不用着急', '锅底剩一点汤汁正常'],
        mistakes: ['继续加热导致汤汁收干', '盛盘太慢导致锅底余温继续加热'],
        rescues: ['汤汁太多就少盛汤，汤太少也不影响吃']
      }
    ]
  }
];

function getRecipeById(id) {
  return recipes.find((recipe) => recipe.id === id) || recipes[0];
}

module.exports = {
  recipes,
  getRecipeById
};

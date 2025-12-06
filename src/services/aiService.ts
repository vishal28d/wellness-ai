import { Profile, WellnessTip, DetailedTip } from '@/context/AppContext';

// Simulated delay to mimic AI processing
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock wellness tips database based on different goals
const tipsByGoal: Record<string, WellnessTip[]> = {
  'Weight Loss': [
    { id: 'wl1', title: 'Mindful Eating', icon: '🍽️', shortDescription: 'Practice conscious eating to reduce overeating and enjoy meals more.' },
    { id: 'wl2', title: 'Hydration First', icon: '💧', shortDescription: 'Drink water before meals to boost metabolism and reduce appetite.' },
    { id: 'wl3', title: 'Walk After Meals', icon: '🚶', shortDescription: 'A 15-minute walk post-meal aids digestion and burns calories.' },
    { id: 'wl4', title: 'Protein Priority', icon: '🥗', shortDescription: 'Start meals with protein to feel fuller longer and preserve muscle.' },
    { id: 'wl5', title: 'Sleep Optimization', icon: '😴', shortDescription: 'Quality sleep regulates hunger hormones and supports weight loss.' },
  ],
  'Better Sleep': [
    { id: 'bs1', title: 'Digital Sunset', icon: '📵', shortDescription: 'Power down screens 1 hour before bed for better melatonin production.' },
    { id: 'bs2', title: 'Cool Room', icon: '❄️', shortDescription: 'Keep bedroom at 65-68°F for optimal sleep temperature.' },
    { id: 'bs3', title: 'Consistent Schedule', icon: '⏰', shortDescription: 'Wake and sleep at the same time daily to regulate your body clock.' },
    { id: 'bs4', title: 'Evening Ritual', icon: '🌙', shortDescription: 'Create a calming bedtime routine to signal sleep time to your body.' },
    { id: 'bs5', title: 'Caffeine Cutoff', icon: '☕', shortDescription: 'Avoid caffeine after 2 PM to prevent sleep interference.' },
  ],
  'Mental Wellness': [
    { id: 'mw1', title: 'Morning Meditation', icon: '🧘', shortDescription: 'Start with 5 minutes of mindfulness to set a calm tone for your day.' },
    { id: 'mw2', title: 'Gratitude Journal', icon: '📔', shortDescription: 'Write 3 things you\'re grateful for daily to shift perspective.' },
    { id: 'mw3', title: 'Nature Therapy', icon: '🌿', shortDescription: 'Spend 20 minutes in nature to reduce stress and anxiety.' },
    { id: 'mw4', title: 'Social Connection', icon: '👥', shortDescription: 'Meaningful conversations boost mood and mental resilience.' },
    { id: 'mw5', title: 'Breathing Practice', icon: '🌬️', shortDescription: 'Box breathing calms the nervous system in moments of stress.' },
  ],
  'Muscle Gain': [
    { id: 'mg1', title: 'Progressive Overload', icon: '💪', shortDescription: 'Gradually increase weights to continuously challenge muscles.' },
    { id: 'mg2', title: 'Post-Workout Protein', icon: '🥤', shortDescription: 'Consume protein within 30 minutes of training for optimal recovery.' },
    { id: 'mg3', title: 'Rest Days Matter', icon: '🛋️', shortDescription: 'Muscles grow during rest; schedule 2-3 recovery days weekly.' },
    { id: 'mg4', title: 'Compound Movements', icon: '🏋️', shortDescription: 'Focus on squats, deadlifts, and presses for maximum muscle activation.' },
    { id: 'mg5', title: 'Sleep for Gains', icon: '💤', shortDescription: '7-9 hours of sleep maximizes growth hormone release.' },
  ],
  'Overall Health': [
    { id: 'oh1', title: 'Daily Movement', icon: '🏃', shortDescription: 'Aim for 30 minutes of activity to boost energy and mood.' },
    { id: 'oh2', title: 'Rainbow Eating', icon: '🌈', shortDescription: 'Eat colorful fruits and veggies for diverse nutrients.' },
    { id: 'oh3', title: 'Stress Check-In', icon: '💭', shortDescription: 'Regularly assess stress levels and practice coping techniques.' },
    { id: 'oh4', title: 'Preventive Care', icon: '🩺', shortDescription: 'Schedule regular health check-ups for early detection.' },
    { id: 'oh5', title: 'Social Wellness', icon: '❤️', shortDescription: 'Nurture relationships for emotional and physical health benefits.' },
  ],
};

// Detailed explanations for tips
const detailedTips: Record<string, Omit<DetailedTip, 'id' | 'title' | 'icon' | 'shortDescription'>> = {
  'wl1': {
    explanation: 'Mindful eating is a powerful practice that transforms your relationship with food. By paying full attention to the experience of eating, you naturally slow down and recognize your body\'s hunger and fullness cues. This awareness helps prevent overeating and reduces emotional eating patterns.\n\nResearch shows that mindful eaters consume 20-25% fewer calories without feeling deprived. The practice also enhances meal satisfaction, as you truly taste and appreciate each bite. Over time, this leads to sustainable weight management without restrictive dieting.',
    steps: [
      'Remove distractions: Turn off TV, put away your phone during meals',
      'Take 3 deep breaths before eating to center yourself',
      'Notice the colors, smells, and textures of your food',
      'Chew each bite 20-30 times, savoring the flavors',
      'Put your fork down between bites to slow your pace',
      'Check in halfway through: Am I still hungry?',
      'Stop eating when you feel 80% full'
    ]
  },
  'wl2': {
    explanation: 'Proper hydration is often overlooked as a weight loss tool, yet it\'s one of the simplest and most effective strategies. Drinking water before meals creates a sense of fullness, naturally reducing calorie intake. Studies show that people who drink 16oz of water before meals lose 44% more weight.\n\nWater also boosts metabolism by 24-30% for up to 1.5 hours after drinking. Often, thirst is mistaken for hunger, leading to unnecessary snacking. Staying hydrated helps your body accurately signal when it truly needs food versus fluids.',
    steps: [
      'Start your morning with 16oz of room temperature water',
      'Drink a full glass 30 minutes before each meal',
      'Keep a water bottle visible on your desk as a reminder',
      'Set hourly hydration reminders on your phone',
      'Flavor water with lemon, cucumber, or mint if plain is boring',
      'Track daily intake using an app or marked water bottle',
      'Aim for half your body weight in ounces daily'
    ]
  },
  'bs1': {
    explanation: 'Blue light from screens suppresses melatonin production, the hormone that regulates your sleep-wake cycle. This disruption can delay sleep onset by up to 3 hours and reduce sleep quality significantly. Creating a "digital sunset" allows your brain to naturally prepare for rest.\n\nBeyond blue light, evening screen use keeps your mind stimulated and alert. Social media, news, and work emails trigger stress responses that make relaxation difficult. Disconnecting creates space for calming pre-sleep activities that promote deeper, more restorative sleep.',
    steps: [
      'Set a specific "devices off" time each night (1 hour before bed)',
      'Enable blue light filters/night mode on all devices',
      'Create a charging station outside the bedroom',
      'Replace scrolling with reading a physical book',
      'Practice gentle stretching or journaling instead',
      'Use this time for meaningful conversation with loved ones',
      'Prepare for tomorrow: lay out clothes, pack bags'
    ]
  },
  'mw1': {
    explanation: 'Morning meditation sets the emotional tone for your entire day. Just 5 minutes of mindfulness practice activates the prefrontal cortex, enhancing focus and emotional regulation. This creates a buffer between you and daily stressors, allowing for more thoughtful responses rather than reactive behaviors.\n\nConsistent morning meditation physically changes the brain over time, increasing gray matter in areas associated with learning, memory, and emotional control. It reduces activity in the amygdala, the brain\'s stress center, leading to decreased anxiety and improved overall mental wellness.',
    steps: [
      'Set your alarm 10 minutes earlier than usual',
      'Before checking your phone, sit comfortably upright',
      'Close your eyes and take 3 deep breaths',
      'Focus on the sensation of breath entering and leaving your body',
      'When thoughts arise, gently acknowledge them and return to breath',
      'Start with 5 minutes, gradually extending to 10-15',
      'Use a guided meditation app if helpful for beginners'
    ]
  },
  'mg1': {
    explanation: 'Progressive overload is the cornerstone of muscle building. Your muscles only grow when faced with challenges beyond their current capability. By systematically increasing the demands on your muscles—whether through more weight, reps, or sets—you create the stimulus needed for hypertrophy.\n\nWithout progressive overload, your body adapts to the current stress level and stops growing. This principle applies whether you\'re a beginner or advanced lifter. Tracking your workouts is essential to ensure you\'re consistently pushing beyond your previous limits.',
    steps: [
      'Log every workout: exercises, weights, sets, and reps',
      'Aim to add 2.5-5 lbs to lifts every 1-2 weeks',
      'If weight increase isn\'t possible, add 1-2 extra reps first',
      'Increase total weekly volume gradually (sets × reps × weight)',
      'Focus on compound lifts as your primary progression targets',
      'Deload every 4-6 weeks to allow recovery and prevent plateau',
      'Track metrics beyond weight: improved form, range of motion'
    ]
  },
  'oh1': {
    explanation: 'Daily movement is the foundation of lasting health. Regular physical activity reduces the risk of chronic diseases by up to 40%, including heart disease, diabetes, and certain cancers. Beyond physical benefits, movement releases endorphins and neurotransmitters that enhance mood, reduce anxiety, and improve cognitive function.\n\nThe key isn\'t intense exercise—it\'s consistent movement. Moderate activity for 30 minutes daily provides profound health benefits without the injury risk or burnout of extreme workouts. This could be walking, cycling, dancing, or gardening—anything that gets your body moving.',
    steps: [
      'Schedule movement like an important meeting in your calendar',
      'Start with 10 minutes if 30 feels overwhelming',
      'Take walking meetings or phone calls when possible',
      'Use stairs instead of elevators throughout the day',
      'Park farther away from entrances for extra steps',
      'Try a new activity monthly to stay engaged',
      'Find a movement buddy for accountability and fun'
    ]
  },
  'wl3': {
    explanation: 'Post-meal walking is a simple yet powerful habit for weight management and overall health. A 15-minute walk after eating helps regulate blood sugar by utilizing glucose from your meal for immediate energy. This prevents the spike-and-crash cycle that leads to cravings and fat storage.\n\nWalking also aids digestion by stimulating the gastrointestinal tract, reducing bloating and discomfort. Studies show that post-dinner walks lower triglyceride levels more effectively than a single 45-minute morning walk. This manageable habit integrates seamlessly into daily life without requiring gym time.',
    steps: [
      'Immediately after finishing your meal, put on comfortable shoes',
      'Walk at a comfortable, conversational pace—no need to rush',
      'Aim for at least 15 minutes, but even 10 helps',
      'Use this time for family connection or podcast listening',
      'Walk outdoors when weather permits for additional mood benefits',
      'If walking isn\'t possible, do light stretching or household chores',
      'Make it non-negotiable: "The meal isn\'t over until I walk"'
    ]
  },
  'wl4': {
    explanation: 'Protein is the most satiating macronutrient, keeping you fuller for longer than carbohydrates or fats. When you start meals with protein, you naturally eat less overall while maintaining stable energy levels. This approach also preserves lean muscle mass during weight loss, keeping your metabolism healthy.\n\nProtein requires more energy to digest (thermic effect), meaning you burn more calories processing protein than other foods. Prioritizing protein also reduces cravings and late-night snacking by stabilizing blood sugar and appetite hormones throughout the day.',
    steps: [
      'Begin each meal by eating your protein source first',
      'Aim for 20-30 grams of protein per meal',
      'Include protein in every snack: Greek yogurt, nuts, cheese',
      'Prep protein in advance: hard-boiled eggs, grilled chicken',
      'Consider a morning protein smoothie to start the day right',
      'Choose lean proteins: chicken, fish, legumes, tofu',
      'Read labels: many "protein" products are sugar-heavy'
    ]
  },
  'wl5': {
    explanation: 'Sleep is the unsung hero of weight management. Poor sleep disrupts leptin and ghrelin, the hormones that regulate hunger and fullness, leading to increased appetite and cravings for high-calorie foods. Just one night of inadequate sleep can increase calorie intake by 300-400 calories.\n\nQuality sleep also affects insulin sensitivity and cortisol levels, both crucial for fat metabolism. During deep sleep, your body repairs muscles and regulates growth hormone, essential for maintaining lean body mass. Prioritizing sleep creates the hormonal environment necessary for successful, sustainable weight loss.',
    steps: [
      'Set a consistent bedtime that allows for 7-9 hours of sleep',
      'Create a cool, dark, quiet sleeping environment',
      'Avoid large meals and caffeine after 2 PM',
      'Establish a relaxing pre-bed routine 30 minutes before sleep',
      'Limit alcohol, which fragments sleep even if you fall asleep faster',
      'Exercise regularly, but complete workouts 3+ hours before bed',
      'If you can\'t sleep after 20 minutes, get up and do something calming'
    ]
  },
  'bs2': {
    explanation: 'Your body temperature naturally drops as you prepare for sleep, and a cool room supports this biological process. Sleeping in a room between 65-68°F (18-20°C) promotes the deep, restorative sleep stages where physical recovery and memory consolidation occur.\n\nA room that\'s too warm prevents your core temperature from dropping, leading to restlessness and lighter sleep. Cool environments also promote melatonin production. While personal preference varies, most sleep research confirms that slightly cooler is better than warmer for optimal sleep quality.',
    steps: [
      'Set your thermostat to 65-68°F (18-20°C) at night',
      'Use a fan for air circulation and white noise benefits',
      'Choose breathable bedding: cotton or bamboo sheets',
      'Take a warm shower before bed—it helps cool your core',
      'Use lightweight, moisture-wicking sleepwear',
      'Keep feet slightly uncovered if you tend to overheat',
      'Consider cooling mattress pads if you\'re a "hot sleeper"'
    ]
  },
  'bs3': {
    explanation: 'Your circadian rhythm is an internal clock that regulates sleepiness and alertness on a 24-hour cycle. Consistent wake and sleep times strengthen this rhythm, making it easier to fall asleep at night and wake refreshed. Irregular schedules confuse your body, leading to symptoms similar to jet lag.\n\nEven weekend "catch-up" sleep disrupts your rhythm. Research shows that a consistent schedule improves not just sleep quality but also mood, metabolism, and cognitive performance. Your body begins preparing for sleep hours before bedtime when it knows what to expect.',
    steps: [
      'Choose a wake time you can maintain 7 days a week',
      'Set a bedtime that allows 7-9 hours before your wake time',
      'Use morning sunlight exposure to reinforce your wake time',
      'Avoid sleeping in more than 30 minutes on weekends',
      'If you must nap, keep it under 20 minutes before 3 PM',
      'Dim lights 1-2 hours before bedtime to signal sleepiness',
      'Track your schedule to build awareness and accountability'
    ]
  },
  'bs4': {
    explanation: 'An evening ritual conditions your brain to associate specific activities with sleep. Just as children benefit from bedtime routines, adults need these signals to transition from daytime alertness to nighttime rest. A consistent sequence of calming activities triggers the parasympathetic nervous system, preparing your body for restorative sleep.\n\nThis ritual should be enjoyable and relaxing, not another task on your to-do list. Over time, these activities become powerful cues that initiate the sleep process automatically, reducing the time it takes to fall asleep and improving overall sleep quality.',
    steps: [
      'Start your routine 30-60 minutes before desired sleep time',
      'Begin with practical tasks: brushing teeth, washing face',
      'Dim all lights to signal to your brain that day is ending',
      'Choose relaxing activities: reading, gentle stretching, journaling',
      'Practice deep breathing or progressive muscle relaxation',
      'Avoid stimulating content: news, work emails, intense shows',
      'End with a few minutes of quiet reflection or gratitude'
    ]
  },
  'bs5': {
    explanation: 'Caffeine has a half-life of 5-6 hours, meaning half of the caffeine from your afternoon coffee is still in your system at bedtime. This blocks adenosine, the neurotransmitter that creates sleep pressure, making it harder to fall asleep and reducing sleep quality even if you do drift off.\n\nMany people underestimate caffeine\'s impact because they can "fall asleep fine." However, caffeine reduces deep sleep stages crucial for physical restoration. Setting a caffeine cutoff allows your body to fully clear the stimulant before bed, leading to noticeably better sleep quality.',
    steps: [
      'Set a firm caffeine cutoff time: 2 PM for most people',
      'Know hidden caffeine sources: chocolate, decaf coffee, some teas',
      'Switch to herbal tea (chamomile, peppermint) after cutoff',
      'If you need afternoon energy, try a 10-minute walk instead',
      'Gradually reduce caffeine if you\'re currently consuming late',
      'Be aware that caffeine sensitivity increases with age',
      'Track your sleep quality as you adjust caffeine habits'
    ]
  },
  'mw2': {
    explanation: 'Gratitude journaling rewires your brain to notice positive experiences. By regularly acknowledging what\'s going well, you strengthen neural pathways associated with optimism and resilience. Studies show that just 3 weeks of gratitude practice leads to lasting increases in happiness and life satisfaction.\n\nThe practice is particularly powerful during difficult times, helping shift focus from problems to resources. Gratitude also improves relationships, as appreciating others makes you more likely to express thanks, creating positive feedback loops in your social connections.',
    steps: [
      'Choose a consistent time: morning sets a positive tone, evening reflects on the day',
      'Use a dedicated notebook or app for your practice',
      'Write 3 specific things you\'re grateful for—not generic items',
      'Include why each item matters to you for deeper impact',
      'Vary your gratitudes: people, experiences, simple pleasures',
      'On hard days, focus on small basics: shelter, food, breath',
      'Review past entries when you need a perspective boost'
    ]
  },
  'mw3': {
    explanation: 'Nature exposure has measurable effects on mental health. Even 20 minutes in natural settings reduces cortisol levels by 21%, lowers blood pressure, and decreases rumination—the repetitive negative thinking that fuels anxiety and depression. This effect, sometimes called "forest bathing" or "nature therapy," works regardless of activity level.\n\nNatural environments provide a form of "soft fascination" that allows the brain\'s directed attention to rest while remaining gently engaged. This restoration effect improves concentration, creativity, and emotional regulation, making nature time a powerful complement to other mental wellness practices.',
    steps: [
      'Schedule 20-minute nature breaks like important appointments',
      'Leave your phone behind or on airplane mode',
      'Engage your senses: notice sounds, smells, textures, colors',
      'If parks aren\'t accessible, tend to indoor plants or sit by a window',
      'Practice slow, deliberate walking without destination goals',
      'Try "sit spots"—return to the same natural place regularly',
      'Combine nature time with other practices: meditation, journaling'
    ]
  },
  'mw4': {
    explanation: 'Social connection is a fundamental human need with direct impacts on mental and physical health. Meaningful conversations activate brain regions associated with pleasure and reduce stress hormones. Loneliness, conversely, triggers inflammation and increases risks comparable to smoking 15 cigarettes daily.\n\nQuality matters more than quantity. A few deep, authentic relationships provide more mental health benefits than many superficial ones. These connections create a sense of belonging, provide emotional support during challenges, and offer different perspectives that expand our own thinking.',
    steps: [
      'Schedule regular connection time with people who energize you',
      'Put away phones during conversations to be fully present',
      'Ask open-ended questions and practice active listening',
      'Share vulnerably—authenticity deepens connection',
      'Reach out to someone you haven\'t talked to in a while',
      'Join groups aligned with your interests for new connections',
      'Balance digital and in-person interactions when possible'
    ]
  },
  'mw5': {
    explanation: 'Box breathing is a simple technique used by Navy SEALs and first responders to rapidly calm the nervous system. By extending your exhale to match your inhale with holds between, you activate the parasympathetic nervous system, which counteracts the stress response within minutes.\n\nThis practice is especially valuable during acute stress moments: before a difficult conversation, during a panic sensation, or when overwhelmed. With regular practice, box breathing becomes an automatic tool you can use anywhere, anytime, to regain emotional equilibrium.',
    steps: [
      'Find a comfortable seated position with feet flat on the floor',
      'Inhale slowly through your nose for 4 counts',
      'Hold your breath gently for 4 counts',
      'Exhale slowly through your mouth for 4 counts',
      'Hold the empty breath for 4 counts',
      'Repeat for 4-8 cycles, or until you feel calm',
      'Practice daily so it\'s automatic when stress hits'
    ]
  },
  'mg2': {
    explanation: 'The post-workout window is crucial for muscle recovery and growth. After training, your muscles are primed to absorb nutrients, with protein synthesis rates elevated for 24-48 hours. Consuming protein within 30 minutes maximizes this anabolic window, providing the amino acids needed to repair and build muscle tissue.\n\nWhile the "anabolic window" has been somewhat debunked for casual exercisers, for those focused on muscle gain, timing still matters. Combining protein with carbohydrates post-workout further enhances recovery by replenishing glycogen stores and creating an insulin response that drives nutrients into muscle cells.',
    steps: [
      'Prepare your post-workout nutrition before training',
      'Aim for 20-40g of high-quality protein within 30 minutes',
      'Include fast-digesting carbs: fruit, rice, potato',
      'Consider whey protein shakes for convenience and quick absorption',
      'Whole food options: Greek yogurt with fruit, chicken and rice',
      'Stay hydrated—dehydration impairs protein synthesis',
      'Don\'t skip post-workout nutrition even if not hungry'
    ]
  },
  'mg3': {
    explanation: 'Muscle growth doesn\'t happen during workouts—it happens during recovery. Training creates microscopic tears in muscle fibers; rest allows these fibers to repair and grow back stronger. Without adequate rest, you accumulate fatigue faster than adaptation, leading to overtraining, injury, and stalled progress.\n\nRest days don\'t mean total inactivity. Light movement, stretching, and foam rolling support recovery by increasing blood flow to damaged tissues. The key is avoiding intense training that creates additional muscle damage before previous damage has healed.',
    steps: [
      'Schedule 2-3 complete rest days per week',
      'Never train the same muscle group on consecutive days',
      'Listen to fatigue signals: excessive soreness, decreased performance',
      'Use rest days for light activities: walking, yoga, swimming',
      'Prioritize 7-9 hours of sleep for optimal recovery',
      'Consider active recovery: foam rolling, stretching, massage',
      'Track recovery metrics: sleep quality, resting heart rate, energy levels'
    ]
  },
  'mg4': {
    explanation: 'Compound movements engage multiple joints and muscle groups simultaneously, providing the most efficient stimulus for muscle growth. Exercises like squats, deadlifts, bench press, and rows work dozens of muscles in each rep, triggering greater hormonal responses (testosterone, growth hormone) than isolation exercises.\n\nThese movements also develop functional strength and coordination that transfers to daily life and sports. Building your program around compound lifts allows you to work more muscle in less time, making your training both effective and time-efficient.',
    steps: [
      'Build workouts around 3-4 compound lifts per session',
      'Master form before adding weight—consider coaching',
      'Include squat variation (back, front, goblet) for legs',
      'Deadlift variations develop entire posterior chain',
      'Horizontal push (bench) and pull (row) for upper body',
      'Overhead press for shoulder development and core stability',
      'Add isolation exercises only after compounds are complete'
    ]
  },
  'mg5': {
    explanation: 'Growth hormone, essential for muscle building and fat burning, is primarily released during deep sleep stages. Sleep deprivation reduces this release by up to 70%, severely limiting your body\'s ability to recover and grow. Beyond hormones, sleep is when protein synthesis peaks and tissue repair accelerates.\n\nAthletes who prioritize sleep see measurably better results from the same training. Sleep also affects workout quality: well-rested individuals lift more weight, complete more reps, and have better coordination and focus. Treating sleep as part of your training program, not separate from it, is essential for muscle gain.',
    steps: [
      'Aim for 7-9 hours of sleep consistently',
      'Maintain the same sleep/wake schedule, even on rest days',
      'Create a sleep-conducive environment: cool, dark, quiet',
      'Avoid screens 1 hour before bed for better sleep quality',
      'Consider sleep-promoting supplements: magnesium, zinc',
      'Limit alcohol—it disrupts deep sleep despite sedative effects',
      'Track sleep quality alongside training metrics'
    ]
  },
  'oh2': {
    explanation: 'Different colored fruits and vegetables contain unique phytonutrients, antioxidants, and vitamins. By eating a variety of colors daily, you ensure a broad spectrum of nutrients that work synergistically to support immune function, reduce inflammation, and protect against chronic diseases.\n\nRed foods provide lycopene and anthocyanins; orange/yellow offer beta-carotene and vitamin C; greens deliver folate and vitamin K; blue/purple contain powerful antioxidants. No single food or supplement can replicate the complex nutritional profile of a colorful, whole-food diet.',
    steps: [
      'Aim to include 3+ colors at each main meal',
      'Shop the perimeter of the grocery store where produce lives',
      'Try one new fruit or vegetable each week',
      'Prep veggies on weekends for easy weekday use',
      'Add spinach or berries to morning smoothies',
      'Snack on raw vegetables with hummus or nut butter',
      'Frozen produce counts—often more nutritious than "fresh"'
    ]
  },
  'oh3': {
    explanation: 'Chronic stress accumulates silently, affecting health before you notice symptoms. Regular stress check-ins help you recognize early warning signs—tension, irritability, sleep changes—before they escalate to burnout or health issues. Awareness is the first step toward effective stress management.\n\nDeveloping a toolkit of coping techniques gives you options when stress peaks. Different situations call for different strategies: physical activity for frustration, breathing for anxiety, social support for grief. Building this flexibility makes you more resilient to life\'s inevitable challenges.',
    steps: [
      'Schedule a daily 2-minute stress check-in (rate 1-10)',
      'Notice physical stress signals: jaw tension, shallow breathing',
      'Identify your top 3 current stressors and write them down',
      'For each stressor, note what\'s within your control',
      'Build a menu of coping strategies for different stress types',
      'Practice techniques when calm so they\'re available during stress',
      'Seek professional support if stress feels unmanageable'
    ]
  },
  'oh4': {
    explanation: 'Preventive healthcare catches potential issues when they\'re most treatable, often before symptoms appear. Regular screenings for blood pressure, cholesterol, blood sugar, and cancer can detect conditions years before they would otherwise become apparent, dramatically improving outcomes.\n\nMost serious health conditions develop gradually. Annual check-ups establish baselines for your personal health metrics, making it easier to spot concerning changes over time. This proactive approach is far more effective—and often less expensive—than reactive treatment of advanced conditions.',
    steps: [
      'Schedule an annual physical with your primary care provider',
      'Know recommended screenings for your age and risk factors',
      'Keep a record of test results to track trends over time',
      'Prepare questions before appointments to use time effectively',
      'Follow up on all abnormal results, even "borderline" ones',
      'Stay current on vaccinations including annual flu shots',
      'Don\'t ignore concerning symptoms—early detection saves lives'
    ]
  },
  'oh5': {
    explanation: 'Strong social connections are consistently linked to longer, healthier lives. Relationships provide emotional support during challenges, practical help when needed, and a sense of purpose and belonging. People with robust social networks have lower rates of depression, stronger immune systems, and reduced cardiovascular risk.\n\nNurturing relationships requires intentional effort in busy modern life. Quality trumps quantity—a few close, trusted relationships provide more benefits than many superficial ones. Regular investment in these connections pays dividends in both mental and physical health.',
    steps: [
      'Identify 3-5 key relationships to prioritize and nurture',
      'Schedule regular connection time, treating it as non-negotiable',
      'Be fully present during interactions—put away distractions',
      'Express appreciation and gratitude to strengthen bonds',
      'Offer support without expecting immediate reciprocation',
      'Join communities aligned with your interests or values',
      'Address conflicts directly rather than letting resentment build'
    ]
  },
};

// Generate tips based on user profile
export const generateWellnessTips = async (profile: Profile): Promise<WellnessTip[]> => {
  // Simulate AI processing time
  await delay(2000 + Math.random() * 1000);
  
  // Collect tips based on user's goals
  const allTips: WellnessTip[] = [];
  
  profile.goals.forEach(goal => {
    const goalTips = tipsByGoal[goal];
    if (goalTips) {
      allTips.push(...goalTips);
    }
  });
  
  // If no specific goals, use overall health tips
  if (allTips.length === 0) {
    allTips.push(...tipsByGoal['Overall Health']);
  }
  
  // Shuffle and return 5 tips
  const shuffled = allTips.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 5);
};

// Generate detailed information for a specific tip
export const generateDetailedTip = async (tip: WellnessTip): Promise<DetailedTip> => {
  // Simulate AI processing time
  await delay(1500 + Math.random() * 500);
  
  const details = detailedTips[tip.id];
  
  if (details) {
    return {
      ...tip,
      ...details,
    };
  }
  
  // Fallback for any tips not in the detailed database
  return {
    ...tip,
    explanation: `${tip.title} is an important practice for your wellness journey. This approach helps you build sustainable habits that support your overall health goals. By incorporating this into your daily routine, you\'ll notice improvements in energy, mood, and physical wellbeing.\n\nConsistency is key with any wellness practice. Start small and gradually build up as the habit becomes automatic. Remember that progress isn\'t always linear—celebrate small wins along the way.`,
    steps: [
      'Start with just 5 minutes dedicated to this practice',
      'Choose a consistent time of day that works with your schedule',
      'Track your progress in a journal or app',
      'Connect with others who share this wellness goal',
      'Adjust the practice as needed based on how you feel',
      'Be patient—meaningful changes take time',
      'Celebrate your commitment to personal wellness'
    ],
  };
};

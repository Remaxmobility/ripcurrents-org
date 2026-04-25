-- Site content key-value store
create table if not exists site_content (
  key         text primary key,
  value       text not null default '',
  updated_at  timestamptz not null default now()
);

-- Auto-update updated_at
create or replace function update_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger site_content_updated_at
  before update on site_content
  for each row execute function update_updated_at();

-- RLS
alter table site_content enable row level security;

-- Public read (frontend can read content)
create policy "public_read_site_content"
  on site_content for select
  using (true);

-- Only service role can write (admin API uses service role key)
-- No insert/update policy needed — supabaseAdmin bypasses RLS

-- Seed with default content
insert into site_content (key, value) values
  ('hero_headline_1',       'KNOW THE'),
  ('hero_headline_2',       'CURRENT.'),
  ('hero_headline_3',       'SAVE YOUR LIFE.'),
  ('hero_subtitle',         'Rip current education and awareness for the Great Lakes region and beyond — evidence-based research, public education, and advocacy to end preventable drowning.'),
  ('hero_cta_primary',      'Learn to Survive'),
  ('hero_cta_secondary',    'What Is a Rip Current?'),
  ('stats_1_value',         '71'),
  ('stats_1_suffix',        ''),
  ('stats_1_label',         'avg. U.S. deaths annually'),
  ('stats_2_value',         '80'),
  ('stats_2_suffix',        '%'),
  ('stats_2_label',         'of all lifeguard rescues'),
  ('stats_3_value',         '60000'),
  ('stats_3_suffix',        '+'),
  ('stats_3_label',         'people rescued per year'),
  ('stats_4_value',         '100'),
  ('stats_4_suffix',        '%'),
  ('stats_4_label',         'preventable with knowledge'),
  ('marquee_text',          'RIP CURRENTS ARE THE #1 BEACH HAZARD • THEY CAN BE DIFFICULT TO DETECT • KNOW BEFORE YOU GO • SWIM PARALLEL TO SHORE. FLOAT AND SIGNAL. CALL FOR HELP.'),
  ('contact_instagram_handle', '@ripcurrentinfo'),
  ('contact_instagram_url',    'https://instagram.com/ripcurrentinfo'),
  ('contact_location',         'Ontario, Canada'),
  ('contact_location_sub',     'Great Lakes Region'),
  ('footer_tagline',           'Saving lives through rip current education on the Great Lakes. Evidence-based research, school outreach, and community awareness across Ontario.'),
  ('footer_copyright_extra',   'Ontario, Canada')
on conflict (key) do nothing;

-- Seed: About page
insert into site_content (key, value) values
  ('about_mission_para',    'The Rip Current Information Project is a Canadian non-profit dedicated to reducing rip current-related fatalities on the Great Lakes through education and community awareness.'),
  ('about_mission_quote',   'To reduce rip current-related fatalities on the Great Lakes by ensuring every beachgoer in Ontario has the knowledge to recognise, avoid, and survive a rip current.'),
  ('about_pillar_1_title',  'Research-Informed'),
  ('about_pillar_1_desc',   'We stay current with the latest science on rip current dynamics specific to the Great Lakes ecosystem.'),
  ('about_pillar_2_title',  'Public Awareness'),
  ('about_pillar_2_desc',   'We work with media, community groups, and emergency services to make rip current knowledge accessible to all.'),
  ('about_pillar_3_title',  'Education Programs'),
  ('about_pillar_3_desc',   'We deliver evidence-based water safety presentations to schools, families, and community groups across Ontario.'),
  ('about_pillar_4_title',  'Partnerships'),
  ('about_pillar_4_desc',   'We collaborate with local authorities, municipalities, and safety organisations to build a culture of prevention.')
on conflict (key) do nothing;

-- Seed: Learn page
insert into site_content (key, value) values
  ('learn_hero_subtitle',       'What rip currents are, how to spot them on Great Lakes beaches, and exactly what to do if you get caught in one.'),
  ('learn_what_para1',          'A rip current is a powerful, concentrated channel of water that flows rapidly away from the shoreline and out into deeper water.'),
  ('learn_what_para2',          'They form when water pushed toward shore by waves escapes through a gap in sandbars or along a pier, rushing outward in a narrow stream. At peak speed, a rip current moves faster than any Olympic swimmer — up to 2.5 metres per second.'),
  ('learn_what_para3',          'Critically, rip currents are not undertows. They flow along the surface, outward from shore. They will not pull you underwater — but they will exhaust you if you try to swim against them.'),
  ('learn_signs_note',          'Always scan from an elevated position — a dune, lifeguard tower, or raised embankment — before entering the water.'),
  ('learn_warning_1_sign',      'Discoloured water'),
  ('learn_warning_1_detail',    'A murky brown or greenish channel cutting through blue water — sediment pulled from the bottom.'),
  ('learn_warning_2_sign',      'Absence of breaking waves'),
  ('learn_warning_2_detail',    'A flat, calm-looking gap between two sections of breaking surf is the channel itself.'),
  ('learn_warning_3_sign',      'Choppy, disturbed surface'),
  ('learn_warning_3_detail',    'Irregular surface chop in a narrow band where the current disrupts incoming swells.'),
  ('learn_warning_4_sign',      'Foam or debris moving seaward'),
  ('learn_warning_4_detail',    'Watch for floating foam, seaweed, or debris drifting steadily away from shore.'),
  ('learn_survival_1_title',    'Stay Calm'),
  ('learn_survival_1_desc',     'Panic wastes energy. A rip current won''t pull you under — it will carry you away from shore.'),
  ('learn_survival_2_title',    'Don''t Fight It'),
  ('learn_survival_2_desc',     'Swimming directly against the current exhausts even strong swimmers. Work with the water, not against it.'),
  ('learn_survival_3_title',    'Swim Parallel'),
  ('learn_survival_3_desc',     'Swim sideways — parallel to the shoreline — to escape the narrow channel. Most rip currents are less than 30 metres wide.'),
  ('learn_survival_4_title',    'Signal for Help'),
  ('learn_survival_4_desc',     'If unable to escape, float and conserve energy. Wave and shout to attract a lifeguard or bystander.'),
  ('learn_stats_para1',         'According to the Lifesaving Society, rip currents are responsible for the majority of lifeguard rescues at Great Lakes beaches — and contribute to dozens of drowning deaths across Canada each year.'),
  ('learn_stats_para2',         'Most victims were strong swimmers. Education is the only prevention.')
on conflict (key) do nothing;

-- Seed: Schools page
insert into site_content (key, value) values
  ('schools_hero_subtitle',   'Free rip current safety presentations for Ontario schools — curriculum-aligned, engaging, and potentially life-saving.'),
  ('schools_why_para1',       'Rip currents are the leading cause of water-related fatalities at Great Lakes beaches in Ontario. Children and teenagers are among the highest-risk groups — yet rip current education is rarely part of school curriculum.'),
  ('schools_why_para2',       'A single 45-minute presentation can permanently change how a student responds to a rip current emergency — for themselves, and for anyone around them. Students who learn this take that knowledge home to their families.'),
  ('schools_why_para3',       'Our program is built specifically for Ontario classrooms, with age-appropriate content that connects directly to existing HPE and Science curriculum expectations.'),
  ('schools_feature_1_title', 'Free of Charge'),
  ('schools_feature_1_desc',  'All school presentations are provided at no cost to the school or board.'),
  ('schools_feature_2_title', 'Age-Appropriate'),
  ('schools_feature_2_desc',  'Tailored content for every grade level from Kindergarten through Grade 12.'),
  ('schools_feature_3_title', 'Curriculum-Aligned'),
  ('schools_feature_3_desc',  'Mapped to Ontario Health and Physical Education and Science curriculum expectations.'),
  ('schools_feature_4_title', 'Multimedia Delivery'),
  ('schools_feature_4_desc',  'Engaging visuals, real-scenario footage, and interactive activities — not just a lecture.'),
  ('schools_topic_1',         'What is a rip current and how does it form'),
  ('schools_topic_2',         'Why Great Lakes rip currents are uniquely dangerous'),
  ('schools_topic_3',         'How to recognise warning signs from shore'),
  ('schools_topic_4',         'The correct survival response: float, stay calm, swim parallel'),
  ('schools_topic_5',         'When and how to call for help'),
  ('schools_topic_6',         'Real incident case studies appropriate to grade level'),
  ('schools_topic_7',         'How to share safety knowledge with family and community'),
  ('schools_booking_note',    'Fill out our contact form and we''ll schedule a presentation for your school at a time that works for you.')
on conflict (key) do nothing;

-- Seed: Families page
insert into site_content (key, value) values
  ('families_hero_subtitle',   'Practical guidance for parents and caregivers visiting Great Lakes beaches in Ontario.'),
  ('families_why_para1',       'Rip currents are the leading cause of drowning deaths at Great Lakes beaches — and they strike without warning. Most victims were good swimmers enjoying a normal day.'),
  ('families_why_para2',       'Young children and teenagers are especially vulnerable. Kids don''t have the strength or experience to recognise the warning signs or respond correctly — and in cold Great Lakes water, the margin for error is slim.'),
  ('families_why_para3',       'The good news: a few minutes of preparation before every beach trip dramatically reduces the risk. Knowledge is the only prevention that works.'),
  ('families_checklist_note',  'Print this out, save it to your phone, or just read it before every Great Lakes beach trip.'),
  ('families_checklist_1',     'Check beach conditions and posted warning flags before you go.'),
  ('families_checklist_2',     'Choose beaches with lifeguards on duty whenever possible.'),
  ('families_checklist_3',     'Scan the water from an elevated position before anyone enters.'),
  ('families_checklist_4',     'Identify a rip current — a discoloured channel with no breaking waves.'),
  ('families_checklist_5',     'Stay within designated swimming areas and between the flags.'),
  ('families_checklist_6',     'Supervise children closely; stay within arm''s reach of young swimmers.'),
  ('families_checklist_7',     'Know the survival rule: swim parallel to shore, not against the current.'),
  ('families_checklist_8',     'Agree on a meeting point if family members get separated.'),
  ('families_talk_note',       'Age-appropriate language to explain rip current danger before you reach the beach.'),
  ('families_talk_1_age',      'Ages 5–8'),
  ('families_talk_1_message',  '"If the water ever pulls you away from shore, don''t panic. Float on your back and call for help. Never try to swim back — swim sideways first."'),
  ('families_talk_2_age',      'Ages 9–13'),
  ('families_talk_2_message',  '"A rip current is a river in the lake. It goes outward fast. The way out is sideways — swim parallel until you feel the pull stop, then angle back to shore."'),
  ('families_talk_3_age',      'Teens'),
  ('families_talk_3_message',  '"Rip currents cause more Great Lakes drownings than any other hazard. Strong swimmers die in them because they fight back and exhaust themselves. The smart move is always sideways."'),
  ('families_cta_body',        'Download our free beach safety materials, or bring a free rip current education presentation to your child''s school this season.')
on conflict (key) do nothing;

-- Seed: Get Involved page
insert into site_content (key, value) values
  ('involved_hero_subtitle', 'Rip currents kill people who didn''t know what they were. Help us change that.'),
  ('involved_why_para1',     'The Rip Current Information Project is a community-powered organisation. Every volunteer hour, every social share, every school booking, and every donation directly supports our ability to reach more Canadians before they reach the water.'),
  ('involved_why_para2',     'Most rip current drownings are preventable. We need your help to make prevention the norm at every Great Lakes beach in Ontario.'),
  ('involved_way_1_title',   'Volunteer'),
  ('involved_way_1_desc',    'Join our team of safety ambassadors at Great Lakes beaches this summer. We provide training on rip current identification and how to assist beachgoers.'),
  ('involved_way_1_cta',     'Apply to Volunteer'),
  ('involved_way_2_title',   'Spread the Word'),
  ('involved_way_2_desc',    'Share our posts, use #RipCurrentSafety, and tag friends planning a Great Lakes trip. Every share reaches someone who might not know the danger.'),
  ('involved_way_2_cta',     'Follow Us'),
  ('involved_way_3_title',   'Book a Presentation'),
  ('involved_way_3_desc',    'Request a free rip current safety presentation for your school, community centre, municipality, or sports club.'),
  ('involved_way_3_cta',     'Request a Presentation'),
  ('involved_way_4_title',   'Partner With Us'),
  ('involved_way_4_desc',    'Municipalities, beach operators, school boards, and safety organisations — partner with us to extend Great Lakes safety education across Ontario.'),
  ('involved_way_4_cta',     'Explore Partnership'),
  ('involved_way_5_title',   'Donate'),
  ('involved_way_5_desc',    'Your donation funds educational materials, volunteer training, school programs, and outreach campaigns that save lives.'),
  ('involved_way_5_cta',     'Support the Mission'),
  ('involved_form_note',     'Tell us how you''d like to help — volunteering, partnerships, donations, or bookings. We''ll get back to you promptly.')
on conflict (key) do nothing;

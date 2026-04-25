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

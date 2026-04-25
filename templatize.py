#!/usr/bin/env python3
"""
templatize.py — strips org/topic-specific content from ripcurrents-org
and replaces it with generic placeholders using local Ollama (mistral).

Usage: python templatize.py
"""

import json
import re
import urllib.request
import shutil
from pathlib import Path

OLLAMA_URL = "http://localhost:11434/api/generate"
MODEL      = "mistral"
BASE       = Path(__file__).parent


# ---------------------------------------------------------------------------
# Ollama helper
# ---------------------------------------------------------------------------

def ask_llama(prompt: str) -> str:
    payload = json.dumps({
        "model": MODEL,
        "prompt": prompt,
        "stream": False,
        "options": {"temperature": 0.2},
    }).encode()
    req = urllib.request.Request(
        OLLAMA_URL, data=payload,
        headers={"Content-Type": "application/json"}, method="POST",
    )
    with urllib.request.urlopen(req, timeout=180) as resp:
        data = json.loads(resp.read())
    return data["response"].strip()


def strip_fences(text: str) -> str:
    text = re.sub(r'^[ \t]*```[a-zA-Z]*\n', '', text)
    text = re.sub(r'\n[ \t]*```[ \t]*$', '', text.rstrip()) + '\n'
    return text


def templatize_file(path: Path, instruction: str) -> str:
    content = path.read_text(encoding="utf-8")
    prompt = f"""{instruction}

Return ONLY the modified file content — no explanations, no markdown fences, no commentary.

FILE:
{content}"""
    return strip_fences(ask_llama(prompt))


# ---------------------------------------------------------------------------
# LLaMA instructions per file
# ---------------------------------------------------------------------------

LLAMA_FILES = {
    "app/layout.tsx": """You are templatizing a Next.js layout file for an awareness/education nonprofit website.
Replace all organization/topic-specific content in the metadata with generic placeholders.

Rules:
- Site name "RIP Currents Info" -> "[Organization Name]"
- Topic "rip current" / "rip currents" -> "[hazard/topic]"
- tagline "Know the Current. Save Your Life." -> "[Know the Hazard. Stay Safe.]"
- keywords: replace with generic awareness/safety/education keywords
- openGraph url: "https://www.ripcurrents.org" -> "https://www.[organization-domain].org"
- metadataBase URL: same
- siteName: "[Organization Name]"
- Any reference to "Great Lakes" -> "[body of water / region]"
- Any person name (Nathan MacIntyre) -> "[Founder Name]"
Keep all imports, font config, and RootLayout function exactly as-is.""",

    "components/sections/Research.tsx": """You are templatizing a React/TypeScript component for an awareness/education nonprofit website.
Replace all organization/topic-specific content with generic placeholders. Keep all JSX structure,
classNames, animation props, and TypeScript syntax exactly as-is.

Rules:
- "Rip Current Information Project (RIP)" -> "[Organization Name] ([ORG])"
- "rip current" / "rip currents" -> "[hazard/topic]"
- "RIP" when used as org acronym -> "[ORG]"
- "Nathan MacIntyre" -> "[Founder Name]"
- "18-season Great Lakes lifeguard" -> "[X]-season [regional] lifeguard"
- "Port Stanley, Ontario" -> "[City, Province/State]"
- "1998" drowning reference -> "[year]"
- "best friend" drowning story -> keep structural reference but anonymize completely
- "Chris Houser, Professor, University of Waterloo" -> "[Advisor Name], Professor, [University Name]"
- "20+ years rip current research" -> "[X]+ years [hazard/topic] research"
- Instagram URL "https://www.instagram.com/ripcurrent_information_project" -> "#"
- "@ripcurrent_information_project" -> "@[organization_handle]"
- "Great Lakes" -> "[body of water / region]"
- "Elgin County Drowning Prevention Coalition" -> "[Regional Safety Coalition]"
- RESEARCH_AREAS: keep 3 areas, same tags and colors, replace specific Great Lakes/rip current details with generic research area descriptions
- The blockquote pull quote: replace with generic advocacy quote""",

    "app/comedy-night/page.tsx": """You are templatizing a Next.js page for a fundraiser comedy night event.
Replace all event/org-specific content with generic placeholders. Keep all JSX structure,
styling, animation, and TypeScript syntax exactly as-is.

Rules:
- Page metadata title/description: replace event name, date, venue, org name with placeholders
- "RiP Roaring Comedy Night" -> "[Event Name]"
- "Rip Current Information Project" -> "[Organization Name]"
- COMEDIANS array: replace names (DK Phan, Andrew Barr, Chuck Byrn) with [Comedian 1], [Comedian 2], [Comedian 3]; keep img paths and bio as "[Comedy Partner] featured comedian"
- TICKET_URL: replace zeffy.com URL with "#"
- "Yuk Yuk's" / "Yuk Yuk's Comics" -> "[Comedy Partner]"
- "Masonic Hall, Elgin" -> "[Venue Name], [City]"
- "42703 Fruit Ridge Line, Elgin, Ontario" -> "[Street Address], [City, Province/State]"
- "April 11, 2026" / "Saturday, April 11" -> "[Event Date]"
- "8:00 – 9:30 PM" -> "[Start Time] – [End Time]"
- "7:30 PM" -> "[Doors Open Time]"
- "Making Waves in Elgin" -> "[Event Tagline]"
- "$50" ticket price -> "$[XX]"
- "$400" table price -> "$[XXX]"
- "Great Lakes beaches" -> "[local area] [beaches/venues]"
- Google Maps href -> "#"
- yukyuks-logo.jpg -> partner-logo.jpg
- "Canada's premier comedy club" -> "[Country]'s premier comedy club"
- "since 1976" -> "since [YEAR]"
- "19+" -> "[AGE]+"
- All beach/water puns (e.g. "shore thing", "Making Waves") can stay or be genericized""",

    "app/resources/page.tsx": """You are templatizing a Next.js resources page for an awareness/education nonprofit website.
Replace all topic/org-specific content with generic placeholders. Keep all JSX structure,
classNames, and TypeScript syntax exactly as-is.

Rules:
- Page metadata: replace topic-specific title/description with generic "[Topic] Resources | [Organization Name]"
- Section label "About Rip Currents" -> "About [Topic/Hazard]"
- Page description: replace "rip current" with "[hazard/topic]"
- RESOURCE_GROUPS: keep the same 3 groups and same structure, but:
  - Replace all specific resource names with generic "[Agency/Organization Name]" placeholders
  - Replace all descriptions with generic "[Description of this resource and its relevance.]"
  - Replace all href values with "#" (placeholder links)
  - Keep the group titles generic (Government & Official Sources, Water Safety Organizations, Research & Academia are fine as-is)
  - "Great Lakes" -> "[body of water / region]"
  - "Chris Houser" / "University of Waterloo" -> "[Researcher Name]" / "[University Name]"
  - "NOAA" / "NWS" / "USLA" / specific organization names -> "[Agency Name]"
  - "Canada" -> "[Country]"
  - "Australian" -> "[Country]"
Keep "Back to Home" link and all structural/nav/footer imports exactly as-is.""",
}


# ---------------------------------------------------------------------------
# Direct string replacements (faster, no LLaMA needed)
# ---------------------------------------------------------------------------

# Global substitutions applied to ALL files after LLaMA pass
# (catches any residual references LLaMA may have missed, and handles
#  files not sent to LLaMA)
GLOBAL_SUBS = [
    # Org / brand
    ("Rip Current Information Project (RIP)", "[Organization Name] ([ORG])"),
    ("Rip Current Information Project",       "[Organization Name]"),
    ("RIP Currents Info",                     "[Organization Name]"),
    ("RIP CURRENTS",                          "[ORGANIZATION]"),
    ("RIP Currents",                          "[Organization]"),
    ("ripcurrents.org",                       "[organization-domain].org"),

    # Person
    ("Nathan MacIntyre",                      "[Founder Name]"),

    # Location
    ("Port Stanley, Ontario, Canada",         "[City, Province/State, Country]"),
    ("Port Stanley, Ontario",                 "[City, Province/State]"),
    ("Port Stanley",                          "[City]"),
    ("Great Lakes",                           "[body of water / region]"),
    ("Elgin County Drowning Prevention Coalition", "[Regional Safety Coalition]"),

    # Social handles / URLs  (order: longer/more specific first)
    ("https://www.instagram.com/ripcurrent_information_project", "#"),
    ("https://www.facebook.com/ripcurrents.org",                 "#"),
    ("https://www.linkedin.com/company/ripcurrents-org",         "#"),
    ("@ripcurrent_information_project",                          "@[organization_handle]"),
    ("ripcurrent_information_project",                           "[organization_handle]"),

    # Alt text / aria labels
    ('alt="RIP Currents logo"',               'alt="[Organization] logo"'),

    # Comedy night event specifics
    ("RiP Roaring Comedy Night",              "[Event Name]"),
    ("Yuk Yuk's International Stand-Up Comedy", "[Comedy Partner]"),
    ("Yuk Yuk's Comics",                      "[Comedy Partner]"),
    ("Yuk\u2019s Comics",                     "[Comedy Partner]"),
    ("Yuk Yuk's",                             "[Comedy Partner]"),
    ("Yuk Yuk\u2019s",                        "[Comedy Partner]"),
    ("Masonic Hall, Elgin",                   "[Venue Name], [City]"),
    ("Masonic Hall",                          "[Venue Name]"),
    ("42703 Fruit Ridge Line, Elgin, Ontario","[Street Address], [City, Province/State]"),
    ("Elgin, Ontario",                        "[City, Province/State]"),
    ("Making Waves in Elgin",                 "[Event Tagline]"),
    ("https://www.zeffy.com/en-CA/ticketing/rip-roaring-comedy-night", "#"),
    ("https://maps.google.com/?q=42703+Fruit+Ridge+Line+Elgin+Ontario", "#"),
    ("yukyuks-logo.jpg",                      "partner-logo.jpg"),
    ("DK Phan",                               "[Comedian 1]"),
    ("Andrew Barr",                           "[Comedian 2]"),
    ("Chuck Byrn",                            "[Comedian 3]"),
    ("Saturday, April 11, 2026",              "[Event Date]"),
    ("Saturday, April 11",                    "[Event Date]"),
    ("April 11, 2026",                        "[Event Date]"),
    ("April 11",                              "[Event Date]"),

    # ComedyReserveForm
    ("Table Reservation \u2013 RiP Roaring Comedy Night", "Table Reservation \u2013 [Event Name]"),
    ("Table Reservation - RiP Roaring Comedy Night",      "Table Reservation - [Event Name]"),

    # Survival guide
    ("FLIP \u00b7 FLOAT \u00b7 FOLLOW",       "[Step 1] \u00b7 [Step 2] \u00b7 [Step 3]"),
    ("FLIP. FLOAT. FOLLOW.",                  "[Step 1]. [Step 2]. [Step 3]."),
    ("Flip. Float. Follow.",                  "[Step 1]. [Step 2]. [Step 3]."),

    # Stats ticker
    ("RIP CURRENTS ARE THE #1 BEACH HAZARD",  "[HAZARD] IS THE #1 [CATEGORY] HAZARD"),
    ("THEY CANNOT BE SEEN FROM UNDERWATER",   "THEY CAN BE DIFFICULT TO DETECT"),
    ("KNOW BEFORE YOU GO",                    "KNOW BEFORE YOU GO"),

    # Footer copyright
    ("Rip Current Information Project (RIP) \u00b7 Port Stanley, Ontario, Canada",
     "[Organization Name] ([ORG]) \u00b7 [City, Province/State, Country]"),
    ("Making access to rip current information easy.",
     "Making access to [hazard/topic] information easy."),

    # Research attribution
    ("Chris Houser, Professor, University of Waterloo", "[Advisor Name], Professor, [University Name]"),

    # Nav label
    ('"RIP Currents logo"', '"[Organization] logo"'),
]


def apply_global_subs(text: str) -> str:
    for old, new in GLOBAL_SUBS:
        text = text.replace(old, new)
    # Case-insensitive sweep for remaining "rip current" variants in prose
    # (but NOT in classNames, CSS variables, or IDs — those use ocean-* tokens)
    # Replace as whole words only, preserving surrounding JSX
    text = re.sub(r'\brip current(?:s)?\b', '[hazard/topic]', text, flags=re.IGNORECASE)
    text = re.sub(r'\bRIP CURRENT(?:S)?\b', '[HAZARD/TOPIC]', text)
    return text


# ---------------------------------------------------------------------------
# Images
# ---------------------------------------------------------------------------

def copy_images():
    comedy_dir = BASE / "public" / "comedy"
    renames = [
        ("yukyuks-logo.jpg", "partner-logo.jpg"),
    ]
    for old, new in renames:
        src, dst = comedy_dir / old, comedy_dir / new
        if src.exists() and not dst.exists():
            shutil.copy2(src, dst)
            print(f"  [image]  copied {old} -> {new}")
        elif not src.exists():
            print(f"  [image]  skip   {old} (not found)")


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main():
    print(f"Model: {MODEL}  |  {OLLAMA_URL}\n")

    # Collect ALL source .tsx/.ts files (not .next / node_modules)
    all_src = [
        f for f in BASE.rglob("*.tsx")
        if ".next" not in str(f) and "node_modules" not in str(f)
    ] + [
        f for f in BASE.rglob("*.ts")
        if ".next" not in str(f) and "node_modules" not in str(f)
        and f.name not in ("tailwind.config.ts", "tsconfig.json", "next-env.d.ts")
    ]

    # 1. LLaMA pass for selected files
    for rel_path, instruction in LLAMA_FILES.items():
        path = BASE / rel_path
        print(f"[llama]  {rel_path} ...")
        try:
            result = templatize_file(path, instruction)
            path.write_text(result, encoding="utf-8")
            print(f"         done\n")
        except Exception as e:
            print(f"         ERROR: {e}\n")

    # 2. Global substitutions on ALL source files
    print("Applying global substitutions to all source files...")
    for path in all_src:
        text = path.read_text(encoding="utf-8")
        new_text = apply_global_subs(text)
        if new_text != text:
            path.write_text(new_text, encoding="utf-8")
            rel = path.relative_to(BASE)
            print(f"  [patch]  {rel}")

    # 3. Images
    copy_images()

    print("\nDone.")


if __name__ == "__main__":
    main()

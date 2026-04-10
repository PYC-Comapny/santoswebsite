export type ServiceSlug = 'master-roofing' | 'siding-exterior' | 'gutter-systems';

export interface ServiceData {
    title: string;
    headline: string;
    subheadline: string;
    heroBadge: string;
    trustTrigger: string; // New: Specific point to attack a fear
    diagnosticStats: {
        label: string;
        value: string;
        desc: string;
        color: string;
    }[];
    processTitle: string;
    processSubtext: string;
    steps: any[];
    waitingMatrix: any[];
    faqs: { question: string; answer: string; }[];
    features: {
        name: string;
        outcome: string;
        mechanism: string;
        iconName: string;
    }[]; // Updated: Detailed outcome/mechanism list with unique icons
    diagnosticHeader: string;
    diagnosticSubheader: string;
    diagnosticButton: string;
}

export const servicesData: Record<ServiceSlug, ServiceData> = {
    'master-roofing': {
        title: 'Master Roofing',
        headline: '25+ Years Of Roofing Craftsmanship.',
        subheadline: 'Whether a quick leak repair or a full replacement, we ensure your home is protected.',
        heroBadge: 'LICENSE: PA006234',
        trustTrigger: 'GUARANTEED 24-HOUR QUOTE RESPONSE',
        diagnosticStats: [
            { label: 'DECK STRENGTH', value: '98.2%', desc: 'Rot-Free Substrate', color: 'text-emerald-500' },
            { label: 'VENTILATION', value: 'OPTIMAL', desc: 'Airflow Efficiency', color: 'text-premiumAccent' },
            { label: 'SEAL GRADE', value: 'PLATINUM', desc: 'Watertight Flashing', color: 'text-slate-900' }
        ],
        diagnosticHeader: 'Roof Audit',
        diagnosticSubheader: '',
        diagnosticButton: 'SYSTEM PROTECTED',
        processTitle: 'The Transparent Roofing Path',
        processSubtext: 'We don\'t just "look" at your roof. We perform a technical audit so you see exactly what we see.',
        steps: [
            { id: 1, title: 'Infrared moisture Scan', description: 'Zero guesswork. We find hidden deck rot before we ever give you a price.', iconName: 'Search' },
            { id: 2, title: 'Itemized "No-Bomb" Quote', description: 'Every shingle and sheet of wood listed. No surprise $6k bills after we start.', iconName: 'ClipboardCheck' },
            { id: 3, title: 'OSHA Safety Install', description: 'Professional, adult crews in full safety gear. Zero mess left behind. Guaranteed.', iconName: 'Wrench' },
            { id: 4, title: 'Final Hardening Cert', description: 'A final 25-point inspection to lock in your lifetime system warranty.', iconName: 'ShieldCheck' }
        ],
        waitingMatrix: [
            { id: 0, title: "Week 1", problem: "Active Leak", decayLabel: "Localized", decayValue: 12, impact: "Safe", impactColor: "text-emerald-500", bgColor: "bg-emerald-500/10", borderColor: "border-emerald-500/20", iconName: 'Activity', description: "Minor repair stops the path of moisture today." },
            { id: 1, title: "Month 3", problem: "Plywood Saturation", decayLabel: "Accelerating", decayValue: 48, impact: "Warning", impactColor: "text-amber-500", bgColor: "bg-amber-500/10", borderColor: "border-amber-500/20", iconName: 'AlertTriangle', description: "The Wood Rot Bomb: Water has soaked through your structure." },
            { id: 2, title: "Year 1", problem: "Structural Collapse", decayLabel: "Terminal", decayValue: 94, impact: "Danger", impactColor: "text-red-500", bgColor: "bg-red-500/10", borderColor: "border-red-500/20", iconName: 'XCircle', description: "Complete system failure. Insurance premiums spike. Home value drops." }
        ],
        faqs: [
            { question: 'What if you find more damage after starting?', answer: 'Our "No-Surprise" guarantee means the price we quote is the price you pay. If we missed something in our scan, we absorb it.' }
        ],
        features: [
            {
                name: 'Master Roof Repair',
                outcome: 'Your roof stops leaking and looks like nothing ever happened. No more worrying every time it rains.',
                mechanism: 'We find broken shingles, pull them out, and install matching replacements. We seal the "underlayment" waterproof layer so the fix is permanent, not a patch.',
                iconName: 'Hammer'
            },
            {
                name: 'Leak Detection',
                outcome: 'We find the exact entry point, even if it\'s nowhere near where the drip is hitting your ceiling.',
                mechanism: 'We trace the water path from your attic to the roof, checking vents, pipes, and valleys so we aren\'t guessing with your money.',
                iconName: 'Search'
            },
            {
                name: 'Chimney Flashing',
                outcome: 'A bone-dry fireplace and zero water damage on the wood around your chimney.',
                mechanism: 'We wrap the base in custom-bent metal "bridges" that shed water away. We tuck the metal into brick joints so water can\'t slide behind it.',
                iconName: 'Flame'
            },
            {
                name: 'Skylight Service',
                outcome: 'Natural light without the moldy drywall or "drip-drip-drip" sound during a storm.',
                mechanism: 'We strip back shingles, install a fresh "ice and water" shield, and reset the metal flashing to make the glass airtight.',
                iconName: 'Sun'
            },
            {
                name: 'Attic Venting',
                outcome: 'Lower AC bills and a roof that lasts 5–10 years longer by letting your home "breathe."',
                mechanism: 'We install Ridge and Soffit vents to create a natural breeze that prevents your shingles from "cooking" from the inside out.',
                iconName: 'Wind'
            }
        ]
    },
    'siding-exterior': {
        title: 'Exterior & Siding',
        headline: 'Weather Proof Your Homes Sidings',
        subheadline: 'Inside and out, high quality remodeling and repairs to make sure it stands.',
        heroBadge: 'LICENSE: PA006234',
        trustTrigger: 'ITEMIZED LABOR & LUMBER PRICING',
        diagnosticStats: [
            { label: 'DRAFT DEFENSE', value: '99.4%', desc: 'Zero-Air Leakage', color: 'text-emerald-500' },
            { label: 'MOISTURE GUARD', value: 'GRADE A', desc: 'Weather-Tight Seal', color: 'text-premiumAccent' },
            { label: 'IMPACT RATING', value: 'HIGH-STRENGTH', desc: 'Storm-Ready Exterior', color: 'text-slate-900' }
        ],
        diagnosticHeader: 'EXTERIOR AUDIT',
        diagnosticSubheader: '',
        diagnosticButton: 'UPGRADE VERIFIED',
        processTitle: 'The Exterior Armor System',
        processSubtext: 'We audit your home\'s envelope to ensure your heating bills drop from day one.',
        steps: [
            { id: 1, title: 'Draft Source Audit', description: 'Using thermal imaging to find exactly where the cold is cutting through.', iconName: 'Search' },
            { id: 2, title: 'Wrap & Seal Plan', description: 'A custom airtight moisture barrier plan tailored to your home\'s layout.', iconName: 'ClipboardCheck' },
            { id: 3, title: 'Precision Install', description: 'Adult, OSHA-certified crews. Laser-leveled panels for a perfect finish.', iconName: 'Wrench' },
            { id: 4, title: 'Efficiency Lock', description: 'A final thermal scan to verify your new 40% energy savings.', iconName: 'ShieldCheck' }
        ],
        waitingMatrix: [
            { id: 0, title: "Week 1", problem: "Drafty Panels", decayLabel: "Minimal", decayValue: 8, impact: "Safe", impactColor: "text-emerald-500", bgColor: "bg-emerald-500/10", borderColor: "border-emerald-500/20", iconName: 'Activity', description: "Minor sealing restoration prevents energy loss." },
            { id: 1, title: "Month 6", problem: "Wall-Cavity Mold", decayLabel: "Moderate", decayValue: 52, impact: "Warning", impactColor: "text-amber-500", bgColor: "bg-amber-500/10", borderColor: "border-amber-500/20", iconName: 'AlertTriangle', description: "Moisture trapped behind siding begins eating your insulation." },
            { id: 2, title: "Year 1", problem: "Pest Infestation", decayLabel: "Systemic", decayValue: 89, impact: "Danger", impactColor: "text-red-500", bgColor: "bg-red-500/10", borderColor: "border-red-500/20", iconName: 'XCircle', description: "Structural wall rot and wood-boring pest damage requiring full removal." }
        ],
        faqs: [
            { question: 'Will my energy bill really drop?', answer: 'Yes. Most customers see a 25-40% reduction in heating/cooling costs with our vapor-seal system.' }
        ],
        features: [
            {
                name: 'Siding Repairs',
                outcome: 'Your home looks uniform again, and you stop water or bugs from getting behind your walls. No more loose panels rattling in the wind.',
                mechanism: 'We source materials that match your existing siding color and texture. We strip back the damaged pieces, inspect the wood "sheathing" underneath for rot, and lock the new panels into the existing tracks so they stay put during a storm.',
                iconName: 'Hammer'
            },
            {
                name: 'Interior Remodeling',
                outcome: 'More usable space and a modern look that makes your home more valuable. You get a room that actually fits how you live.',
                mechanism: 'We handle the framing, drywall, and finishing based on a set timeline. We walk you through every material choice and cost before we start, so there are no "surprise bills" halfway through the project.',
                iconName: 'Home'
            },
            {
                name: 'Exterior Remodeling',
                outcome: 'Your house looks brand new from the street. You get better insulation, lower maintenance, and a massive boost in curb appeal.',
                mechanism: 'We update the "skin" of your home—windows, doors, and trim. We use high-grade materials like fiber cement or premium vinyl and seal every joint with weather-proof flashing to prevent leaks before they start.',
                iconName: 'Layout'
            },
            {
                name: 'Full Transformation',
                outcome: 'A complete "reset" of your home’s look and feel, inside and out, without the stress of managing five different contractors.',
                mechanism: 'We coordinate the roofing, siding, and interior crews into one synchronized schedule. You get one point of contact, a clear start-to-finish plan, and a job site that gets cleaned up every single day until the work is done.',
                iconName: 'Activity'
            }
        ]
    },
    'gutter-systems': {
        title: 'Gutter Systems',
        headline: 'Safeguard Your Home With Gutter Systems',
        subheadline: 'Reliable protection for every storm.',
        heroBadge: 'LICENSE: PA006234',
        trustTrigger: 'SEAMLESS FLOW GUARANTEE',
        diagnosticStats: [
            { label: 'PITCH ACCURACY', value: '98.2%', desc: 'Optimal Slope Flow', color: 'text-emerald-500' },
            { label: 'FLOW VELOCITY', value: '+12%', desc: 'Downspout Capacity', color: 'text-premiumAccent' },
            { label: 'JOINT INTEGRITY', value: 'PLATINUM', desc: 'Leak-Free Seal', color: 'text-slate-900' }
        ],
        diagnosticHeader: 'DRAINAGE AUDIT',
        diagnosticSubheader: '',
        diagnosticButton: 'PROTECTION VERIFIED',
        processTitle: 'Water Velocity Engineering',
        processSubtext: 'We don\'t just nail up aluminum; we map out your lot\'s entire drainage system.',
        steps: [
            { id: 1, title: 'Terrain Drainage Map', description: 'We map where the water goes after it hits the ground. No pooling allowed.', iconName: 'Search' },
            { id: 2, title: 'Velocity Plan', description: 'Sizing gutters and downspouts to handle atmospheric river rainfall.', iconName: 'ClipboardCheck' },
            { id: 3, title: 'Seamless Rollout', description: 'On-site custom fabrication. zero seams. Zero leak points. Ever.', iconName: 'Wrench' },
            { id: 4, title: 'Basement Hardening', description: 'Verify downspout discharge is 10+ feet from your foundation.', iconName: 'ShieldCheck' }
        ],
        waitingMatrix: [
            { id: 0, title: "Week 1", problem: "Minor Overflow", decayLabel: "Negligible", decayValue: 15, impact: "Safe", impactColor: "text-emerald-500", bgColor: "bg-emerald-500/10", borderColor: "border-emerald-500/20", iconName: 'Activity', description: "Simple pitch tuning prevents water from hitting your walls." },
            { id: 1, title: "Month 6", problem: "Siding Staining", decayLabel: "Corrosive", decayValue: 55, impact: "Warning", impactColor: "text-amber-500", bgColor: "bg-amber-500/10", borderColor: "border-amber-500/20", iconName: 'AlertTriangle', description: "Water spilling over rot out your siding and bleeds into your basement." },
            { id: 2, title: "Year 1", problem: "Foundation Cracks", decayLabel: "Catastrophic", decayValue: 98, impact: "Danger", impactColor: "text-red-500", bgColor: "bg-red-500/10", borderColor: "border-red-500/20", iconName: 'XCircle', description: "Hydrostatic pressure from poor drainage cracks your foundation slab." }
        ],
        faqs: [
            { question: 'Do guards actually work?', answer: 'Our micro-mesh system is the only one we trust for Erie\'s heavy leaf fall. They are guaranteed not to clog.' }
        ],
        features: [
            {
                name: 'Gutter Installation',
                outcome: 'Rainwater is moved safely away from your house. This prevents your basement from flooding and stops your mulch and landscaping from being washed away.',
                mechanism: 'We measure the "pitch" (the slope) of your roof to ensure water flows perfectly toward the downspouts. We use heavy-duty hidden hangers every 2 feet to make sure the gutters don’t sag or pull away under the weight of heavy rain.',
                iconName: 'ArrowDownToLine'
            },
            {
                name: 'Gutter Repairs',
                outcome: 'No more "waterfalls" over your front door or leaks dripping behind your siding. Your existing system works like new again.',
                mechanism: 'We scrape out old, cracked caulk and apply high-grade waterproof sealant to all corners and joints. We replace rusted or loose screws with larger "oversized" fasteners that bite into fresh wood to pull the gutter tight back against your home.',
                iconName: 'Hammer'
            },
            {
                name: 'Leaf Protection',
                outcome: 'You never have to climb a dangerous ladder to scoop out rotting leaves again. Your gutters stay clear and flow freely 365 days a year.',
                mechanism: 'We install a micro-mesh or solid-surface guard over your existing gutters. The guard lets water surface-tension into the gutter while the leaves and sticks simply slide off the edge and onto the ground.',
                iconName: 'Leaf'
            },
            {
                name: 'Seamless Setup',
                outcome: 'A cleaner look for your home with 90% fewer leaks. Since there are no "seams" in the middle of the run, there is nowhere for the gutter to rust out or fail.',
                mechanism: 'We bring a specialized machine to your driveway and "extrude" (form) a single continuous piece of aluminum to the exact length of your house. It is custom-made on the spot so it fits your roofline perfectly with zero gaps.',
                iconName: 'Droplets'
            }
        ]
    }
};

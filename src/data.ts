export type Status = 'Available' | 'Configured per deployment' | 'Planned' | 'Requires validation'

export const challenges = [
  {
    title: 'Browser-based threats',
    user: 'Employees and web application users',
    concern: 'Websites may contain malicious or compromised active content.',
    capability: 'Route selected sessions to an isolated environment and present the rendered experience.',
    choices: ['Standard access', 'Open in isolation', 'Restrict interaction', 'Block'],
    measure: 'Sessions routed by destination risk and policy',
  },
  {
    title: 'Phishing links',
    user: 'Email and collaboration users',
    concern: 'External links may lead to credential-harvesting pages or malicious websites.',
    capability: 'Apply destination policy, isolation, warnings, data-entry restrictions, and event reporting.',
    choices: ['Isolate', 'Warn', 'Restrict data entry', 'Log and notify'],
    measure: 'Warnings and restricted data-entry events',
  },
  {
    title: 'Risky downloads',
    user: 'Users receiving files from the web',
    concern: 'Downloaded files may contain active content or malware.',
    capability: 'Apply download handling based on destination, file type, identity, and device context.',
    choices: ['Block', 'Allow', 'Scan', 'Sanitize', 'Require approval'],
    measure: 'Download requests by policy outcome',
  },
  {
    title: 'Browser data leakage',
    user: 'Teams handling protected information',
    concern: 'Uploads, clipboard use, printing, or data entry may move information to unapproved sites.',
    capability: 'Apply interaction controls where supported by the deployment and inspection model.',
    choices: ['Allow', 'Warn', 'Restrict', 'Require approval', 'Log'],
    measure: 'Content-transfer policy events',
  },
  {
    title: 'Contractors and unmanaged devices',
    user: 'External workers and partners',
    concern: 'External users may lack the endpoint configuration used by employees.',
    capability: 'Provide policy-controlled browsing or application access through an isolated session, subject to deployment validation.',
    choices: ['Isolate', 'Restrict downloads', 'Limit clipboard', 'Expire session'],
    measure: 'Access by device posture and user group',
  },
  {
    title: 'Friction from broad blocking',
    user: 'Researchers and service-delivery teams',
    concern: 'Category-wide blocking can interrupt legitimate research and daily work.',
    capability: 'Use isolation or restricted interaction as an alternative for selected destinations.',
    choices: ['Standard access', 'Isolate', 'Warn', 'Restrict interaction'],
    measure: 'Policy interruptions and exception requests',
  },
]

export const browserDestinations = [
  { host: 'research-portal.example', category: 'Approved research', outcome: 'Standard access', risk: 'Low', download: 'Allow', upload: 'Allow approved types', clipboard: 'Allow', print: 'Allow', data: 'Allow' },
  { host: 'partner-access.example', category: 'Partner portal', outcome: 'Open in isolation', risk: 'Moderate', download: 'Require approval', upload: 'Block', clipboard: 'One direction', print: 'Watermark', data: 'Allow' },
  { host: 'news-source.example', category: 'News and media', outcome: 'Open in isolation', risk: 'Moderate', download: 'Scan', upload: 'Block', clipboard: 'Allow copy out', print: 'Allow', data: 'Warn' },
  { host: 'unknown-site.example', category: 'Uncategorized', outcome: 'Restricted interaction', risk: 'Elevated', download: 'Block', upload: 'Block', clipboard: 'Block', print: 'Block', data: 'Restrict' },
  { host: 'external-files.example', category: 'File sharing', outcome: 'Require approval', risk: 'Elevated', download: 'Require approval', upload: 'Require approval', clipboard: 'Block', print: 'Block', data: 'Warn' },
  { host: 'benefits-application.example', category: 'Business application', outcome: 'Standard access', risk: 'Low', download: 'Allow', upload: 'Allow', clipboard: 'Allow', print: 'Allow', data: 'Allow' },
]

export const transferControls: Record<string, { name: string; status: Status }[]> = {
  Downloads: [
    { name: 'Allow or block', status: 'Available' }, { name: 'Scan', status: 'Requires validation' },
    { name: 'Sanitize', status: 'Requires validation' }, { name: 'Convert to a safer format', status: 'Planned' },
    { name: 'Require approval', status: 'Configured per deployment' }, { name: 'Watermark', status: 'Requires validation' },
    { name: 'Log activity', status: 'Configured per deployment' },
  ],
  Uploads: [
    { name: 'Allow approved destinations', status: 'Configured per deployment' }, { name: 'Block restricted destinations', status: 'Available' },
    { name: 'Inspect file type', status: 'Requires validation' }, { name: 'Apply size limits', status: 'Planned' },
    { name: 'Require approval', status: 'Configured per deployment' }, { name: 'Log activity', status: 'Configured per deployment' },
  ],
  Clipboard: [
    { name: 'Allow or block', status: 'Available' }, { name: 'Permit one direction', status: 'Configured per deployment' },
    { name: 'Limit content type', status: 'Requires validation' }, { name: 'Warn', status: 'Available' },
    { name: 'Log activity', status: 'Configured per deployment' },
  ],
  Printing: [
    { name: 'Allow or block', status: 'Available' }, { name: 'Watermark', status: 'Requires validation' },
    { name: 'Require approval', status: 'Planned' }, { name: 'Log activity', status: 'Configured per deployment' },
  ],
  'Data entry': [
    { name: 'Allow or warn', status: 'Available' }, { name: 'Restrict on unknown destinations', status: 'Configured per deployment' },
    { name: 'Protect selected fields', status: 'Requires validation' }, { name: 'Require stronger authentication', status: 'Requires validation' },
    { name: 'Log policy events', status: 'Configured per deployment' },
  ],
}

export const roles: Record<string, string[]> = {
  Employee: ['Familiar browsing', 'Visible isolation status', 'Clear policy messages', 'Safer file handling', 'Access to required websites', 'Support guidance'],
  Contractor: ['Controlled web access', 'Restricted downloads', 'Limited clipboard use', 'Isolated access to selected applications', 'Session expiration', 'Clear policy messages'],
  'Security administrator': ['Policy configuration', 'User groups', 'Destination categories', 'File controls', 'Exceptions', 'Rollout settings', 'Audit history'],
  'SOC analyst': ['Policy events', 'Risky destinations', 'Blocked actions', 'Download events', 'User reports', 'Investigation context', 'Escalations'],
  'Help-desk analyst': ['Session status', 'Policy explanation', 'User troubleshooting', 'Exception workflow', 'Device context', 'Support history'],
  'Risk and compliance leader': ['Policy coverage', 'Exceptions', 'Browsing trends', 'Content-transfer events', 'Administrative changes', 'Retention settings'],
}

export const deploymentModels = {
  'Cloud-hosted service': ['Provider-operated service boundary', 'Shared operational responsibility', 'Data handling defined by agreement', 'Central policy administration', 'Internet or private connectivity', 'Validate tenancy, region, and recovery model'],
  'Customer-controlled cloud': ['Service components in a customer-controlled account', 'Customer-led platform operations', 'Customer-defined data controls', 'Delegated policy administration', 'Private or public connectivity', 'Validate upgrades and support boundaries'],
  'Hybrid deployment': ['Customer and service components', 'Split operational responsibility', 'Data flows documented per component', 'Coordinated policy administration', 'Private and service connectivity', 'Validate dependencies and failure modes'],
  'Region-specific deployment': ['Workloads placed in an approved geography', 'Responsibility depends on hosting model', 'Regional handling requirements', 'Central or regional administration', 'Region-aware routing', 'Availability and regions require confirmation'],
  'Managed service': ['Platform paired with operational services', 'Responsibility defined in service scope', 'Handling follows agreed procedures', 'Provider-assisted administration', 'Service connectivity and escalation paths', 'Coverage hours and services require confirmation'],
}

export const rollout = {
  Discover: ['Browser usage', 'User groups', 'Critical web applications', 'Existing security tools', 'Data-transfer requirements', 'Privacy requirements'],
  Design: ['Isolation policy', 'Destination categories', 'Content controls', 'Identity integration', 'Logging and retention', 'Exception process'],
  Pilot: ['Selected user groups', 'User-experience testing', 'Application compatibility', 'Performance review', 'Policy tuning', 'Help-desk preparation'],
  Expand: ['Additional user groups', 'Additional destinations', 'Refined content controls', 'Security integration', 'Administrative reporting'],
  'Operate and refine': ['Policy reviews', 'Exception management', 'Performance monitoring', 'User feedback', 'Security-event analysis', 'Product updates'],
}

export const adminTabs: Record<string, string[]> = {
  'Users and groups': ['General workforce · 2,480', 'Contractors · 184', 'Research team · 72'],
  'Browsing policies': ['General internet isolation', 'Privileged access restrictions', 'Contractor web access'],
  'Destination categories': ['Business applications', 'General internet', 'Newly observed', 'Restricted'],
  'Content controls': ['Download rules', 'Upload rules', 'Clipboard and print', 'Data entry'],
  Exceptions: ['12 active', '4 expiring soon', '2 awaiting review'],
  'Security events': ['Blocked upload · external-files.example', 'Data-entry warning · unknown-site.example', 'Restricted download · partner-access.example'],
  'Platform health': ['Session routing · Operational', 'Policy evaluation · Operational', 'Event processing · Operational'],
  'Audit history': ['Policy edited by A. Rivera', 'Exception approved by J. Chen', 'Category changed by S. Patel'],
}

export const analyticsData = [
  { name: 'Mon', standard: 62, isolated: 29, restricted: 7, blocked: 2 },
  { name: 'Tue', standard: 58, isolated: 32, restricted: 8, blocked: 2 },
  { name: 'Wed', standard: 64, isolated: 27, restricted: 6, blocked: 3 },
  { name: 'Thu', standard: 60, isolated: 31, restricted: 7, blocked: 2 },
  { name: 'Fri', standard: 67, isolated: 25, restricted: 6, blocked: 2 },
]

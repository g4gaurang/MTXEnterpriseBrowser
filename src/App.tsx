import { FormEvent, useMemo, useState } from 'react'
import {
  Activity, AlertTriangle, ArrowDown, ArrowRight, ArrowUp, BarChart3,
  Check, ChevronRight, Clipboard, Cloud, Database, Download,
  ExternalLink, FileCheck2, Fingerprint, Globe2, History, Info, Layers3,
  Menu, Monitor, Network, PanelTop, Printer, RadioTower, Route, Search, Settings2,
  ShieldCheck, SlidersHorizontal, Upload, UserCheck, Users, X, Zap,
} from 'lucide-react'
import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from 'recharts'
import {
  adminTabs, analyticsData, browserDestinations, challenges, deploymentModels, roles, rollout, transferControls,
} from './data'
import './App.css'

const nav = [
  ['Overview', 'overview'], ['How It Works', 'how-it-works'], ['Policies', 'policies'],
  ['User Experience', 'experience'], ['Administration', 'administration'],
  ['Architecture', 'architecture'], ['Analytics', 'analytics'],
]

const architectureSteps = [
  { title: 'User requests a website', copy: 'A user opens a destination from a managed or approved access point.', icon: Globe2 },
  { title: 'Policy evaluates context', copy: 'Identity, role, device posture, destination, action, and available security signals inform routing.', icon: SlidersHorizontal },
  { title: 'Content executes in isolation', copy: 'Selected web content runs in an isolated environment based on configured policy.', icon: Cloud },
  { title: 'Rendered experience is delivered', copy: 'The user interacts with the rendered session. The rendering method requires technical validation.', icon: PanelTop },
  { title: 'Policy activity is recorded', copy: 'Configured session metadata, actions, and security events become available for review.', icon: History },
]

const contextSignals = ['User identity', 'User role', 'Device posture', 'Destination category', 'Destination reputation', 'File type', 'Requested action', 'Data sensitivity', 'Location or network context', 'Existing security signals']

const policyOptions = {
  group: ['General workforce', 'Privileged administrator', 'Contractor', 'Research team', 'Finance team', 'Help-desk team'],
  device: ['Managed and compliant', 'Managed with elevated risk', 'Unmanaged', 'Unknown'],
  destination: ['Approved business application', 'General internet', 'Newly observed website', 'Personal webmail', 'File-sharing service', 'Uncategorized destination', 'Known restricted category'],
  action: ['Browse', 'Enter information', 'Download', 'Upload', 'Copy', 'Paste', 'Print'],
  outcome: ['Allow', 'Isolate', 'Restrict interaction', 'Warn', 'Require approval', 'Block', 'Log and notify'],
}

const governance = {
  'Data collection': ['Session metadata', 'Destination information', 'Policy actions', 'File-transfer events', 'Administrative changes', 'Security events'],
  'Privacy configuration': ['Data minimization', 'Masking', 'Retention period', 'Role-based access', 'Session-recording controls', 'User notice', 'Approved monitoring purposes'],
  'Administrative governance': ['Policy ownership', 'Change approval', 'Exception authority', 'Separation of duties', 'Audit history', 'Access review'],
  'Investigation governance': ['Authorized analysts', 'Evidence access', 'Escalation', 'Retention', 'Legal review', 'Employee privacy'],
}

const productServices = [
  { title: 'Enterprise Secure Browser platform', tag: 'Platform', items: ['Policy-controlled browsing', 'Remote browser isolation', 'Destination policies', 'Content-transfer controls', 'Administrative console', 'Security events', 'Reporting', 'Audit history'] },
  { title: 'Implementation services', tag: 'Services', items: ['Environment discovery', 'Architecture', 'Identity integration', 'Policy design', 'Application testing', 'Pilot support', 'User communications', 'Training', 'Deployment'] },
  { title: 'Managed services', tag: 'Requires confirmation', items: ['Platform monitoring', 'Policy administration', 'Exception support', 'Security-event review', 'Reporting', 'Release management', 'User support', 'Operational reviews'] },
]

function Badge({ children, tone = 'blue' }: { children: React.ReactNode; tone?: string }) {
  return <span className={`badge badge-${tone}`}>{children}</span>
}

function SectionHeader({ eyebrow, title, copy }: { eyebrow: string; title: string; copy: string }) {
  return <div className="section-header">
    <p className="eyebrow">{eyebrow}</p>
    <h2>{title}</h2>
    <p>{copy}</p>
  </div>
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [challenge, setChallenge] = useState(0)
  const [archStep, setArchStep] = useState(1)
  const [destination, setDestination] = useState(1)
  const [transferTab, setTransferTab] = useState('Downloads')
  const [role, setRole] = useState('Employee')
  const [adminTab, setAdminTab] = useState('Security events')
  const [adminNotice, setAdminNotice] = useState('')
  const [deployment, setDeployment] = useState('Cloud-hosted service')
  const [governanceTab, setGovernanceTab] = useState('Data collection')
  const [phase, setPhase] = useState('Discover')
  const [phishStep, setPhishStep] = useState(0)
  const [formSent, setFormSent] = useState(false)
  const [policy, setPolicy] = useState({ group: 'Contractor', device: 'Unmanaged', destination: 'Uncategorized destination', action: 'Browse', outcome: 'Isolate' })
  const browser = browserDestinations[destination]

  const policySentence = useMemo(() => {
    const action = policy.action.toLowerCase()
    const outcome = policy.outcome === 'Isolate' ? 'open the destination in isolation' : `${policy.outcome.toLowerCase()} the requested action`
    return `${policy.group} members using a ${policy.device.toLowerCase()} device may ${outcome} when they ${action} at a ${policy.destination.toLowerCase()}. The event is available for policy review.`
  }, [policy])

  function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setFormSent(true)
    event.currentTarget.reset()
  }

  return (
    <>
      <a className="skip-link" href="#main">Skip to main content</a>
      <header className="site-header">
        <a className="brand" href="#overview" aria-label="MTX Enterprise Secure Browser home">
          <span className="brand-mark"><PanelTop size={19} /><ShieldCheck size={13} /></span>
          <span>MTX <strong>Enterprise Secure Browser</strong></span>
        </a>
        <button className="menu-button" aria-expanded={menuOpen} aria-controls="site-nav" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X /> : <Menu />}<span className="sr-only">Toggle navigation</span>
        </button>
        <nav id="site-nav" aria-label="Primary navigation" className={menuOpen ? 'nav-open' : ''}>
          {nav.map(([label, href]) => <a key={href} href={`#${href}`} onClick={() => setMenuOpen(false)}>{label}</a>)}
          <a className="button button-small" href="#contact" onClick={() => setMenuOpen(false)}>Request a Demo</a>
        </nav>
      </header>

      <main id="main">
        <section className="hero" id="overview">
          <div className="hero-glow" />
          <div className="container hero-grid">
            <div className="hero-copy">
              <Badge tone="cyan"><RadioTower size={14} /> Enterprise Browser Security</Badge>
              <h1>Separate risky web activity from managed endpoints</h1>
              <p className="hero-lead">Route web sessions through an isolated environment and apply browsing policies based on user, destination, device, content type, and business need.</p>
              <p>MTX Enterprise Secure Browser helps organizations provide controlled access to websites and web applications while reducing direct endpoint exposure to active web content. Security teams can define how users browse, transfer files, enter information, and interact with higher-risk destinations.</p>
              <div className="button-row">
                <a className="button" href="#browser">Explore an Isolated Session <ArrowRight size={17} /></a>
                <a className="button button-secondary" href="#policy-builder">Configure a Browsing Policy</a>
                <a className="text-link" href="#contact">Request a Product Demonstration <ChevronRight size={16} /></a>
              </div>
              <p className="category-note"><Layers3 size={17} /> Enterprise browsing with remote browser isolation</p>
            </div>
            <div className="hero-product" aria-label="Illustrative isolated browsing session and policy panel">
              <div className="illustrative-label">Illustrative product experience</div>
              <div className="browser-top">
                <span className="dot red" /><span className="dot amber" /><span className="dot green" />
                <div className="mini-tab"><Globe2 size={13} /> Partner workspace</div>
              </div>
              <div className="address"><ShieldCheck size={16} /><span>partner-access.example</span><Badge tone="green">Isolation active</Badge></div>
              <div className="hero-workspace">
                <div className="rendered-page">
                  <div className="rendered-nav"><span className="skeleton wide" /><span className="skeleton short" /></div>
                  <div className="rendered-body">
                    <Badge tone="violet">Partner portal</Badge>
                    <h3>Quarterly resource center</h3>
                    <p>Rendered session delivered under the selected browsing policy.</p>
                    <div className="file-row"><FileCheck2 /><span>Partner-brief.pdf</span><Badge tone="amber">Approval</Badge></div>
                  </div>
                </div>
                <aside className="policy-rail">
                  <h3><SlidersHorizontal size={17} /> Session policy</h3>
                  {[
                    ['User role', 'Contractor'], ['Device posture', 'Unmanaged'], ['Download', 'Approval'],
                    ['Upload', 'Blocked'], ['Clipboard', 'One direction'], ['Session', 'Active'],
                  ].map(([key, value]) => <div className="policy-line" key={key}><span>{key}</span><strong>{value}</strong></div>)}
                </aside>
              </div>
            </div>
          </div>
        </section>

        <section className="scope-band" aria-labelledby="scope-title">
          <div className="container">
            <p className="scope-label" id="scope-title">Platform scope <span>Illustrative product structure, not customer results</span></p>
            <div className="scope-grid">
              {[
                ['4', 'Browsing modes', 'Standard · Isolated · Restricted · Blocked'],
                ['6', 'Policy-control categories', 'Access · Downloads · Uploads · Clipboard · Print · Data entry'],
                ['3', 'User experiences', 'End user · Administrator · Oversight analyst'],
                ['1', 'Administrative view', 'Policy, events, exceptions, and audit history'],
              ].map(([number, title, detail]) => <div className="scope-item" key={title}><strong>{number}</strong><div><h3>{title}</h3><p>{detail}</p></div></div>)}
            </div>
          </div>
        </section>

        <section className="section light" id="challenges">
          <div className="container">
            <SectionHeader eyebrow="Web-security challenges" title="Use policy to choose the right browsing response" copy="Isolation is one policy option. Organizations can combine access, interaction, and event controls based on context." />
            <div className="challenge-layout">
              <div className="challenge-list" role="tablist" aria-label="Web-security challenges">
                {challenges.map((item, index) => (
                  <button key={item.title} role="tab" aria-selected={challenge === index} className={challenge === index ? 'selected' : ''} onClick={() => setChallenge(index)}>
                    <span>{String(index + 1).padStart(2, '0')}</span>{item.title}<ChevronRight />
                  </button>
                ))}
              </div>
              <div className="detail-panel" role="tabpanel">
                <Badge tone="violet">Selected challenge</Badge><h3>{challenges[challenge].title}</h3>
                <dl className="detail-list">
                  <div><dt>User affected</dt><dd>{challenges[challenge].user}</dd></div>
                  <div><dt>Security concern</dt><dd>{challenges[challenge].concern}</dd></div>
                  <div><dt>MTX capability</dt><dd>{challenges[challenge].capability}</dd></div>
                  <div><dt>Available policy choices</dt><dd className="badge-row">{challenges[challenge].choices.map(choice => <Badge key={choice}>{choice}</Badge>)}</dd></div>
                  <div><dt>Suggested measure</dt><dd>{challenges[challenge].measure}</dd></div>
                </dl>
              </div>
            </div>
          </div>
        </section>

        <section className="section dark" id="how-it-works">
          <div className="container">
            <SectionHeader eyebrow="How remote browser isolation works" title="A context-aware route between users and selected web content" copy="The sequence below describes a high-level model. Rendering technology and routing coverage require validation against the selected deployment." />
            <div className="stepper" role="tablist" aria-label="Isolation architecture stages">
              {architectureSteps.map((step, index) => {
                const Icon = step.icon
                return <button key={step.title} role="tab" aria-selected={archStep === index} onClick={() => setArchStep(index)} className={archStep === index ? 'active' : ''}>
                  <span>{index + 1}</span><Icon /><strong>{step.title}</strong>
                </button>
              })}
            </div>
            <div className="architecture-detail" role="tabpanel">
              <div><p className="step-count">Stage {archStep + 1} of 5</p><h3>{architectureSteps[archStep].title}</h3><p>{architectureSteps[archStep].copy}</p></div>
              {archStep === 1 ? <div className="signal-cloud">{contextSignals.map(signal => <span key={signal}>{signal}</span>)}</div> :
                <div className="flow-visual" aria-label="Flow from user endpoint through policy and isolation to a web destination">
                  <span><Monitor /> Endpoint</span><ArrowRight /><span><SlidersHorizontal /> Policy</span><ArrowRight /><span><Cloud /> Isolation</span><ArrowRight /><span><Globe2 /> Web</span>
                </div>}
            </div>
          </div>
        </section>

        <section className="section light" id="browser">
          <div className="container">
            <SectionHeader eyebrow="Interactive isolated browser" title="See policy change with the destination" copy="Choose a fictional .example destination. This simulation does not load websites or inspect URLs." />
            <div className="browser-simulator">
              <div className="sim-toolbar">
                <div className="window-controls"><span /><span /><span /></div>
                <label className="address-select"><span className="sr-only">Select simulated destination</span><ShieldCheck size={17} />
                  <select value={destination} onChange={event => setDestination(Number(event.target.value))}>
                    {browserDestinations.map((item, index) => <option value={index} key={item.host}>{item.host}</option>)}
                  </select>
                </label>
                <Badge tone={browser.risk === 'Low' ? 'green' : browser.risk === 'Moderate' ? 'amber' : 'red'}>{browser.risk} risk</Badge>
              </div>
              <div className="sim-status">
                <span><Cloud size={16} /> {browser.outcome}</span><span><Globe2 size={16} /> {browser.category}</span><span><UserCheck size={16} /> Research team</span><span><Monitor size={16} /> Managed device</span>
              </div>
              <div className="sim-content">
                <div className="fake-site">
                  <p className="site-kicker">{browser.category}</p><h3>{browser.host.split('.')[0].replace('-', ' ')}</h3>
                  <p>This fictional page represents content delivered under the active browsing policy.</p>
                  <div className="fake-content-grid"><span /><span /><span /></div>
                  <div className="sim-actions">
                    {[{ name: 'Download', Icon: Download, value: browser.download }, { name: 'Upload', Icon: Upload, value: browser.upload }, { name: 'Clipboard', Icon: Clipboard, value: browser.clipboard }, { name: 'Print', Icon: Printer, value: browser.print }, { name: 'Data entry', Icon: Fingerprint, value: browser.data }].map(({ name, Icon, value }) => {
                      return <button key={name} onClick={() => setAdminNotice(`${name}: ${value}`)}><Icon />{name}<small>{value}</small></button>
                    })}
                  </div>
                  {adminNotice && <div className="local-notice" role="status"><Info /> Policy simulation: {adminNotice}<button onClick={() => setAdminNotice('')} aria-label="Dismiss policy message"><X /></button></div>}
                </div>
                <aside className="security-panel">
                  <Badge tone="cyan">Illustrative session</Badge><h3>Security information</h3>
                  <div className="risk-orbit"><ShieldCheck /><span>{browser.risk}<small>destination risk</small></span></div>
                  <dl><div><dt>Route</dt><dd>{browser.outcome}</dd></div><div><dt>Category</dt><dd>{browser.category}</dd></div><div><dt>Policy</dt><dd>Research web access</dd></div><div><dt>Event logging</dt><dd>Configured</dd></div></dl>
                </aside>
              </div>
            </div>
          </div>
        </section>

        <section className="section warm" id="policies">
          <div className="container" id="policy-builder">
            <SectionHeader eyebrow="Browsing policy builder" title="Turn business context into a readable policy" copy="Change the conditions and outcome to create an illustrative policy statement." />
            <div className="policy-builder">
              <div className="builder-form">
                {Object.entries(policyOptions).map(([key, values]) => (
                  <label key={key}><span>{key === 'group' ? 'User group' : key === 'device' ? 'Device status' : key === 'destination' ? 'Destination type' : key === 'action' ? 'Requested action' : 'Policy outcome'}</span>
                    <select value={policy[key as keyof typeof policy]} onChange={event => setPolicy({ ...policy, [key]: event.target.value })}>
                      {values.map(value => <option key={value}>{value}</option>)}
                    </select>
                  </label>
                ))}
              </div>
              <div className="policy-result">
                <Badge tone="violet">Illustrative policy simulation</Badge><SlidersHorizontal size={28} />
                <h3>Policy in plain language</h3><blockquote>{policySentence}</blockquote>
                <div className="rule-code"><span>WHEN</span> {policy.group} + {policy.device}<br /><span>AT</span> {policy.destination}<br /><span>THEN</span> {policy.outcome}</div>
              </div>
            </div>
          </div>
        </section>

        <section className="section light">
          <div className="container">
            <SectionHeader eyebrow="Content-transfer controls" title="Control how information moves through the browser" copy="These controls are potential capabilities. Status labels distinguish current examples from items that need deployment or product validation." />
            <div className="tabs" role="tablist" aria-label="Content-transfer controls">
              {Object.keys(transferControls).map(tab => <button key={tab} role="tab" aria-selected={transferTab === tab} className={transferTab === tab ? 'active' : ''} onClick={() => setTransferTab(tab)}>{tab}</button>)}
            </div>
            <div className="control-grid" role="tabpanel">
              {transferControls[transferTab].map(control => <div className="control-card" key={control.name}><div className="control-icon">{transferTab === 'Downloads' ? <ArrowDown /> : transferTab === 'Uploads' ? <ArrowUp /> : transferTab === 'Printing' ? <Printer /> : transferTab === 'Clipboard' ? <Clipboard /> : <Fingerprint />}</div><h3>{control.name}</h3><Badge tone={control.status === 'Available' ? 'green' : control.status === 'Planned' ? 'violet' : control.status === 'Requires validation' ? 'amber' : 'blue'}>{control.status}</Badge></div>)}
            </div>
          </div>
        </section>

        <section className="section scenario-section">
          <div className="container">
            <SectionHeader eyebrow="Phishing and credential protection" title="Layer isolation with identity and data-entry policy" copy="Browser isolation can reduce exposure to active web content. Credential protection also depends on destination controls, identity security, authentication methods, user behavior, and configured policy." />
            <div className="scenario">
              <div className="scenario-track" role="tablist" aria-label="Phishing scenario steps">
                {['External link', 'Open destination', 'Route to isolation', 'Credential request', 'Warn or restrict', 'Record event', 'Provide guidance'].map((item, index) =>
                  <button key={item} role="tab" aria-selected={phishStep === index} className={phishStep === index ? 'active' : ''} onClick={() => setPhishStep(index)}><span>{index + 1}</span>{item}</button>
                )}
              </div>
              <div className="scenario-card" role="tabpanel">
                <Badge tone={phishStep >= 4 ? 'amber' : 'cyan'}>Step {phishStep + 1}</Badge>
                <div className="scenario-icon">{phishStep < 2 ? <ExternalLink /> : phishStep < 4 ? <Cloud /> : phishStep < 6 ? <AlertTriangle /> : <UserCheck />}</div>
                <h3>{['A user receives an external link', 'The destination opens', 'Policy routes the session to isolation', 'The site requests credentials', 'Data-entry policy warns or restricts', 'A security event is recorded', 'The user or analyst receives guidance'][phishStep]}</h3>
                <p>{phishStep === 4 ? 'Configured policy can interrupt data entry on an unknown destination. Isolation by itself does not prevent credential theft.' : 'The configured response reflects destination risk, user context, and requested interaction.'}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="section dark" id="experience">
          <div className="container">
            <SectionHeader eyebrow="Role-based experiences" title="One platform, distinct operational views" copy="Select a role to see the information and controls relevant to that user." />
            <div className="role-selector">
              <div className="role-tabs" role="tablist" aria-label="Role experiences">{Object.keys(roles).map(item => <button role="tab" aria-selected={role === item} className={role === item ? 'active' : ''} onClick={() => setRole(item)} key={item}>{item}</button>)}</div>
              <div className="role-view" role="tabpanel"><div className="role-identity"><div><Users /></div><p>Experience for</p><h3>{role}</h3></div><ul>{roles[role].map(item => <li key={item}><Check />{item}</li>)}</ul></div>
            </div>
          </div>
        </section>

        <section className="section light" id="administration">
          <div className="container">
            <SectionHeader eyebrow="Administrative console" title="Operate policy with context and traceability" copy="Explore fictional groups, policies, security events, platform status, and administrative history." />
            <div className="admin-console">
              <aside className="admin-nav"><div className="admin-logo"><Settings2 /> Administration</div>{Object.keys(adminTabs).map(tab => <button className={adminTab === tab ? 'active' : ''} onClick={() => setAdminTab(tab)} key={tab}>{tab}</button>)}</aside>
              <div className="admin-main">
                <div className="admin-heading"><div><p>Illustrative administrative data</p><h3>{adminTab}</h3></div><button className="button button-small" onClick={() => setAdminNotice(`${adminTab} action created locally`)}>Create or review <ArrowRight /></button></div>
                <div className="admin-kpis"><div><span>Policies</span><strong>18</strong><small>12 active · 6 pilot</small></div><div><span>Open reviews</span><strong>7</strong><small>Events and exceptions</small></div><div><span>Recent changes</span><strong>14</strong><small>Previous 7 days</small></div></div>
                <div className="admin-table" role="table" aria-label={`${adminTab} illustrative records`}>
                  {adminTabs[adminTab].map((item, index) => <button role="row" key={item} onClick={() => setAdminNotice(`Reviewing: ${item}`)}><span role="cell"><span className={`event-dot event-${index}`} />{item}</span><span role="cell">{index === 0 ? 'Review' : index === 1 ? 'Configured' : 'Recorded'}</span><ChevronRight /></button>)}
                </div>
                <div className="admin-actions"><button onClick={() => setAdminNotice('Policy draft created locally')}><SlidersHorizontal /> Create policy</button><button onClick={() => setAdminNotice('User group editor opened locally')}><Users /> Edit group</button><button onClick={() => setAdminNotice('Exception draft added locally')}><FileCheck2 /> Add exception</button><button onClick={() => setAdminNotice('Category review opened locally')}><Globe2 /> Change category</button></div>
                {adminNotice && <div className="local-notice" role="status"><Check />{adminNotice}<button onClick={() => setAdminNotice('')} aria-label="Dismiss administrative message"><X /></button></div>}
              </div>
            </div>
          </div>
        </section>

        <section className="section architecture-section" id="architecture">
          <div className="container">
            <SectionHeader eyebrow="Security architecture" title="Connect browser policy to identity and security operations" copy="Potential connection points are shown without vendor logos. Integration support and technical methods require validation." />
            <div className="architecture-map" role="img" aria-label="Users and endpoints connect through identity context to MTX policy, remote isolation, and web destinations, with potential security ecosystem integrations.">
              <div className="arch-column"><h3><Monitor /> Users & endpoints</h3>{['Managed workstations', 'Mobile devices', 'Contractor devices', 'Privileged users', 'Remote workforce'].map(item => <span key={item}>{item}</span>)}</div>
              <ArrowRight className="arch-arrow" />
              <div className="arch-column"><h3><Fingerprint /> Identity & context</h3>{['Identity provider', 'Multifactor authentication', 'Device posture', 'User groups', 'Access policies'].map(item => <span key={item}>{item}</span>)}</div>
              <ArrowRight className="arch-arrow" />
              <div className="arch-column mtx-core"><Badge tone="cyan">MTX</Badge><h3><ShieldCheck /> Secure Browser</h3>{['Policy evaluation', 'Session routing', 'Remote isolation', 'Content controls', 'Security-event logging', 'Administration', 'Reporting'].map(item => <span key={item}>{item}</span>)}</div>
              <ArrowRight className="arch-arrow" />
              <div className="arch-column"><h3><Globe2 /> Web destinations</h3>{['Business applications', 'General websites', 'Partner portals', 'Personal web services', 'Unknown destinations', 'Restricted destinations'].map(item => <span key={item}>{item}</span>)}</div>
              <div className="ecosystem"><h3><Network /> Potential security ecosystem connections</h3>{['Secure web gateway', 'SASE or SSE', 'Endpoint security', 'SIEM', 'Identity platform', 'Data-loss prevention', 'Ticketing', 'Threat intelligence'].map(item => <Badge key={item}>{item} · validate</Badge>)}</div>
            </div>
          </div>
        </section>

        <section className="section warm">
          <div className="container">
            <SectionHeader eyebrow="Deployment models" title="Select an operating model for discussion" copy="These are possible patterns, not confirmed MTX deployment options. Hosting, regions, tenancy, and data residency require review." />
            <div className="deployment-selector">
              <div className="deployment-tabs" role="tablist" aria-label="Deployment models">{Object.keys(deploymentModels).map(item => <button role="tab" aria-selected={deployment === item} className={deployment === item ? 'active' : ''} onClick={() => setDeployment(item)} key={item}>{item}</button>)}</div>
              <div className="deployment-view" role="tabpanel"><Badge tone="amber">Requires confirmation</Badge><Cloud /><h3>{deployment}</h3><dl>{['General architecture', 'Management responsibility', 'Data handling', 'Policy administration', 'Connectivity', 'Operational considerations'].map((term, index) => <div key={term}><dt>{term}</dt><dd>{deploymentModels[deployment as keyof typeof deploymentModels][index]}</dd></div>)}</dl></div>
            </div>
          </div>
        </section>

        <section className="section light">
          <div className="container">
            <SectionHeader eyebrow="Privacy and governance" title="Define what is collected, who can use it, and why" copy="Governance decisions should reflect legal, privacy, workforce, and security requirements. Full session recording is neither assumed nor presented as available." />
            <div className="governance-explorer">
              <div className="governance-tabs" role="tablist" aria-label="Privacy and governance topics">{Object.keys(governance).map(item => <button role="tab" aria-selected={governanceTab === item} className={governanceTab === item ? 'active' : ''} onClick={() => setGovernanceTab(item)} key={item}>{item}</button>)}</div>
              <div className="governance-view" role="tabpanel"><div className="governance-heading"><Database /><div><p>Policy topic</p><h3>{governanceTab}</h3></div></div><ul>{governance[governanceTab as keyof typeof governance].map(item => <li key={item}><Check />{item}<Badge tone="blue">Configure</Badge></li>)}</ul></div>
            </div>
          </div>
        </section>

        <section className="section analytics-section" id="analytics">
          <div className="container">
            <SectionHeader eyebrow="Analytics and recommended measures" title="Measure policy, security, experience, and operations" copy="Sample values demonstrate dashboard structure. They are not MTX or customer results." />
            <div className="chart-grid">
              <div className="chart-card"><div className="chart-title"><div><Badge tone="cyan">Illustrative product data</Badge><h3>Browsing activity mix</h3></div><BarChart3 /></div><ResponsiveContainer width="100%" height={260}><BarChart data={analyticsData}><CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#dbe4ee" /><XAxis dataKey="name" /><YAxis /><Tooltip /><Legend /><Bar dataKey="standard" name="Standard" stackId="a" fill="#315ee7" /><Bar dataKey="isolated" name="Isolated" stackId="a" fill="#14b8d4" /><Bar dataKey="restricted" name="Restricted" stackId="a" fill="#f0a62e" /><Bar dataKey="blocked" name="Blocked" stackId="a" fill="#d84f58" /></BarChart></ResponsiveContainer><p className="chart-alt">Table summary: standard sessions form the largest sample category each day, followed by isolated, restricted, and blocked sessions.</p></div>
              <div className="chart-card"><div className="chart-title"><div><Badge tone="cyan">Illustrative product data</Badge><h3>Policy interruption trend</h3></div><Activity /></div><ResponsiveContainer width="100%" height={260}><AreaChart data={analyticsData}><CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#dbe4ee" /><XAxis dataKey="name" /><YAxis /><Tooltip /><Legend /><Area type="monotone" dataKey="restricted" name="Restricted" stroke="#7c66e8" fill="#dcd6fb" /><Area type="monotone" dataKey="blocked" name="Blocked" stroke="#c53e4a" fill="#f5c7cb" /></AreaChart></ResponsiveContainer><p className="chart-alt">Table summary: illustrative restricted events range from six to eight and blocked events from two to three.</p></div>
            </div>
            <div className="measure-grid">{[
              ['Browsing activity', ['Isolated sessions', 'Standard sessions', 'Restricted sessions', 'Blocked destinations', 'Destination categories']],
              ['Content transfer', ['Download requests', 'Blocked downloads', 'Sanitized files', 'Upload requests', 'Clipboard restrictions', 'Print events']],
              ['Security', ['Risky destinations', 'Phishing-related events', 'User-reported sites', 'Policy warnings', 'Escalated events']],
              ['User experience', ['Session-start time', 'Page-response performance', 'Policy interruption rate', 'Help-desk contacts', 'Exception requests']],
              ['Administration', ['Policy changes', 'Active exceptions', 'Expiring exceptions', 'Coverage by user group', 'Platform health']],
            ].map(([title, items]) => <div key={title as string}><Badge tone="blue">Illustrative product data</Badge><h3>{title}</h3><ul>{(items as string[]).map(item => <li key={item}>{item}</li>)}</ul></div>)}</div>
          </div>
        </section>

        <section className="section dark">
          <div className="container">
            <SectionHeader eyebrow="Adoption roadmap" title="Introduce controls through measured phases" copy="Move from discovery to ongoing refinement without prescribing a fixed rollout duration." />
            <div className="roadmap-tabs" role="tablist" aria-label="Adoption roadmap phases">{Object.keys(rollout).map((item, index) => <button role="tab" aria-selected={phase === item} className={phase === item ? 'active' : ''} onClick={() => setPhase(item)} key={item}><span>0{index + 1}</span>{item}</button>)}</div>
            <div className="roadmap-view" role="tabpanel"><div><Badge tone="violet">Selected phase</Badge><h3>{phase}</h3><p>Review these workstreams with security, IT, privacy, support, and business stakeholders.</p></div><ul>{rollout[phase as keyof typeof rollout].map(item => <li key={item}><Check />{item}</li>)}</ul></div>
          </div>
        </section>

        <section className="section light">
          <div className="container">
            <SectionHeader eyebrow="Product and service model" title="Separate platform capability from delivery services" copy="Managed services are included only as a discussion area and require MTX confirmation, including scope and coverage hours." />
            <div className="service-grid">{productServices.map(service => <article key={service.title}><Badge tone={service.tag === 'Requires confirmation' ? 'amber' : 'blue'}>{service.tag}</Badge><h3>{service.title}</h3><ul>{service.items.map(item => <li key={item}><Check />{item}</li>)}</ul></article>)}</div>
          </div>
        </section>

        <section className="section maturity-section">
          <div className="container">
            <SectionHeader eyebrow="Product maturity and operating evidence" title="Use evidence labels before external publication" copy="This prototype avoids customer outcomes, benchmarks, certifications, compatibility claims, geographic claims, and unvalidated integration availability." />
            <div className="maturity-grid">{[
              ['Policy-controlled browsing', 'Available'], ['Remote browser isolation', 'Requires validation'], ['Destination policies', 'Configured per deployment'],
              ['Content-transfer controls', 'Configured per deployment'], ['Session recording', 'Requires validation'], ['Reporting and audit history', 'Requires validation'],
              ['Identity and security integrations', 'Requires validation'], ['Managed operational services', 'Requires validation'],
            ].map(([item, status]) => <div key={item}><span>{item}</span><Badge tone={status === 'Available' ? 'green' : status === 'Configured per deployment' ? 'blue' : 'amber'}>{status}</Badge></div>)}</div>
          </div>
        </section>

        <section className="section why-section">
          <div className="container">
            <SectionHeader eyebrow="Why MTX Enterprise Secure Browser" title="Focused controls for web access and interaction" copy="A browser-oriented security layer designed to work with approved identity, endpoint, web-security, and operational processes." />
            <div className="why-grid">{[
              [Route, 'Isolation based on context', 'Route selected web activity to an isolated environment based on user, device, destination, and requested action.'],
              [SlidersHorizontal, 'Configurable interaction controls', 'Apply policies to downloads, uploads, clipboard activity, printing, and data entry where supported.'],
              [PanelTop, 'Familiar user experience', 'Provide clear security indicators and policy messages within a browser-oriented experience.'],
              [Zap, 'Connection to security operations', 'Send approved policy events and investigation context to the organization’s security and support processes.'],
            ].map(([Icon, title, copy]) => { const ItemIcon = Icon as typeof Route; return <article key={title as string}><ItemIcon /><h3>{title as string}</h3><p>{copy as string}</p></article> })}</div>
          </div>
        </section>

        <section className="cta-section" id="contact">
          <div className="container cta-grid">
            <div><Badge tone="cyan">Product conversation</Badge><h2>Give people access to the web with stronger separation and control</h2><p>Explore how MTX Enterprise Secure Browser can support isolated web sessions, configurable interaction policies, and security visibility.</p><div className="cta-options"><span><ShieldCheck /> Request a Secure Browser Demonstration</span><span><Search /> Schedule a Browser Security Assessment</span><span><Users /> Discuss a Workforce Pilot</span></div></div>
            <form onSubmit={submitForm} aria-label="Request a product discussion">
              <div className="form-note"><Info /> Local prototype form. Information is not transmitted.</div>
              <div className="form-grid">
                <label>Name<input name="name" autoComplete="name" required /></label>
                <label>Organization<input name="organization" autoComplete="organization" required /></label>
                <label>Role<input name="role" autoComplete="organization-title" /></label>
                <label>Email<input name="email" type="email" autoComplete="email" required /></label>
                <label>Estimated user population<select name="population"><option>Fewer than 500</option><option>500–2,499</option><option>2,500–9,999</option><option>10,000 or more</option><option>Not yet known</option></select></label>
                <label>Current browser environment<input name="browser" placeholder="Describe at a high level" /></label>
                <label className="full">Primary security concern<select name="concern"><option>Risky web content</option><option>Phishing and data entry</option><option>Downloads and uploads</option><option>Contractor access</option><option>Policy visibility</option></select></label>
                <label className="full">Message<textarea name="message" rows={4} /></label>
              </div>
              <button className="button" type="submit">Request a product discussion <ArrowRight /></button>
              {formSent && <div className="form-success" role="status"><Check /> Request saved in this browser session for demonstration only. No information was sent.</div>}
            </form>
          </div>
        </section>
      </main>

      <footer><div className="container"><a className="brand" href="#overview"><span className="brand-mark"><PanelTop size={17} /><ShieldCheck size={12} /></span><span>MTX Enterprise Secure Browser</span></a><p>Enterprise browsing with remote browser isolation</p><p>Prototype content and data are illustrative. Capabilities, deployment options, integrations, and operating evidence require MTX validation.</p></div></footer>
      <a className="back-top" href="#overview" aria-label="Back to top"><ArrowUp /></a>
    </>
  )
}

export default App

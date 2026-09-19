# applyd — Job Application Tracker

An intelligent job application tracker that tells you what needs attention, when to follow up, and whether an opportunity has gone cold.

## Why applyd?

Job hunting is stressful. Tracking applications in spreadsheets is tedious and gives you zero intelligence. applyd continuously interprets the state of your applications and surfaces what needs action **today** — so you can focus on landing the job, not managing the spreadsheet.

## Features

### 🎯 Action-Oriented Dashboard
- **Follow-ups due** — surfaces applications needing a check-in based on real inactivity, not manual reminders
- **Upcoming interviews** — see what's on your calendar at a glance
- **Health summaries** — active, waiting, stale, or ghosted applications at a glance

### 📊 Intelligent Application Tracking
- **Automatic health states** — each application is classified as healthy, needs attention, stale, or likely ghosted
- **Smart follow-up windows** — status-aware inactivity detection (7 days for applied, 5 for screening, 3 for interviewing)
- **Ghosting detection** — stops bothering you about dead leads after prolonged silence
- **Derived next actions** — the app tells you what to do next, not the other way around

### 📝 Complete Application Records
- Company, role, location, salary range, employment type
- Application source tracking (LinkedIn, referrals, job boards)
- Recruiter contact information
- Notes and custom fields

### 📅 Activity Timeline
Every interaction is logged chronologically:
- Application submitted, emails sent/received
- Recruiter contacts, screening calls
- Status changes (automatically logged as milestones)
- Follow-ups, notes, and observations

### 🎤 Interview Management
- Schedule and track interviews (technical, behavioral, screening)
- Interviewer details and meeting links
- Preparation checklists
- Past vs. upcoming interview distinction

### 📈 Insights (Coming Soon)
- Application funnel visualization
- Response and interview conversion rates
- Source effectiveness analysis

## Tech Stack

- **Backend:** Laravel 12, PHP 8.2
- **Frontend:** React 18, Inertia.js
- **UI:** daisyUI (Tailwind CSS)
- **Database:** MySQL
- **Icons:** Lucide React

## Installation

### Prerequisites
- PHP 8.2+
- Composer
- Node.js 18+
- MySQL

### Setup

1. Clone the repository
```bash
git clone https://github.com/yourusername/applyd.git
cd applyd
```

2. Install dependencies
```bash
composer install
npm install
```

3. Configure environment
```bash
cp .env.example .env
php artisan key:generate
```

4. Set up database
Update `.env` with your database credentials, then:
```bash
php artisan migrate
```

5. Build assets
```bash
npm run build
```

6. Start the server
```bash
php artisan serve
```

Visit `http://localhost:8000`

## Development

### Running dev server
```bash
npm run dev
php artisan serve
```

### Running tests
```bash
php artisan test
```

### Code style
```bash
./vendor/bin/pint
```

## Project Structure

```
app/
├── Actions/              # Single-purpose domain operations
│   ├── DetermineApplicationHealth.php
│   ├── DetermineNextAction.php
│   └── EvaluateGhostingStatus.php
├── Http/Controllers/     # Thin HTTP handlers
├── Models/              # Eloquent models
└── Services/            # Multi-step business logic

resources/js/
├── Components/          # Shared React components
├── Layouts/            # Page layouts
└── Pages/              # Inertia pages

database/
├── migrations/         # Database schema
└── factories/          # Test data generators
```

## Design Philosophy

applyd is deliberately **not** a generic productivity tool. It does one thing: help you manage job applications intelligently.

**What it is:**
- An intelligent tracker that surfaces what needs action
- A timeline of every interaction
- A decision-support system for your job search

**What it's not:**
- A Notion clone with custom fields and databases
- A CRM for managing recruiter relationships at scale
- A calendar app (only tracks application and interview dates)
- A job board (it tracks applications, not job listings)

## Roadmap

- [x] Application CRUD with status lifecycle
- [x] Activity timeline
- [x] Follow-up engine with status-aware windows
- [x] Application health states
- [x] Interview management
- [x] Dashboard with action items
- [ ] User-configurable follow-up windows
- [ ] Email draft templates
- [ ] Analytics and insights dashboard
- [ ] Export to CSV/PDF

## Contributing

This is a personal project rebuild, but suggestions and bug reports are welcome. Open an issue or submit a PR.

## License

MIT License — see [LICENSE](LICENSE) for details.

---

Built with Laravel and React. Designed to reduce job search anxiety, one follow-up at a time.

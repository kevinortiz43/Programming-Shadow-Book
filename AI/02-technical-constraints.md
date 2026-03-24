# Technical Constraints

## Must Not Do

### External API Calls

- **No external API calls** to production systems, third-party services, or external data sources
- All data should come from the student-implemented Node API with Postgres
- Do not make HTTP requests to real CyQu APIs

### Authentication & Authorization

- **No authentication assumptions**: Do not assume users are logged in or have specific roles
- The prototype should work without any authentication system
- Treat all users as having the same access level

### Data Storage

- **Node API with Postgres DB**: Students should implement a simple Node.js API with a PostgreSQL database
- The API should serve Trust Controls and FAQs data
- Seed the database with the provided JSON files in `02_data/`
- BONUS: CRUD CMS

### Production Dependencies

- **No production credentials**: Do not use or reference any real API keys, tokens, or credentials
- **No production endpoints**: Do not connect to any production or staging environments

## Expected Data Usage

### Mock/Sanitized Data

- Seed the Postgres database with the provided JSON files in `02_data/`:
  - `allTrustControls.json` - Contains 16 Trust Controls organized by category
  - `allTrustFaqs.json` - Contains 5 FAQ entries with questions and answers
- The data structure follows a GraphQL-style format with Relay flavor (edges/nodes pattern)
- This data is sanitized and safe for use in prototypes
- You may extend or modify this data as you please

### Data Structure

The data follows a GraphQL-style structure with Relay flavor (edges/nodes pattern):

- `data.allTrustControls.edges[]` - Array of Trust Control nodes
- `data.allTrustFaqs.edges[]` - Array of FAQ nodes
- Each node contains: `id`, `category` (for controls), `question`/`answer` (for FAQs), `short`/`long` (for controls), and metadata

## Technical Recommendations

### Frontend

- Use modern web technologies (React, Vue, etc.) as appropriate
- Follow the Aon Design System guidelines (see `04_resources/design-system.md`)
- BONUS: Ensure the UI is responsive and accessible
- EXTRA EXTRA EXTRA BONUS: If you want the project to be integrates into CyQu production systems, all components must be implemented as Web Components (StencilJS)

### AI/LLM Integration

- If using an LLM API (e.g., OpenAI, Anthropic), use API keys that can be safely shared or use environment variables
- Consider using local LLM options if available to avoid external dependencies (LM Studio)

### Performance

- The prototype should load and respond quickly
- Optimize AI responses to be fast and relevant

## Development Environment

- Students should be able to run the prototype locally without complex setup
- Use standard package managers (npm, yarn, pnpm)
- Include clear setup instructions in a README
- Document any required environment variables

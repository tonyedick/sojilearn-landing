# Sojilearn UK Study Abroad Landing Page

A high-converting landing page for Sojilearn's UK study abroad services, featuring an interactive multi-step form and Supabase integration.

## Features

- 🎯 High-converting hero section with urgency countdown
- 📝 Interactive 4-step lead capture form
- 🔒 Supabase integration for secure data storage
- 📱 Fully responsive design
- 🧪 Test data generator for easy testing
- ✅ Comprehensive form validation
- 🎨 Modern UI with smooth animations

## Setup Instructions

### 1. Supabase Setup

1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Go to your project settings and copy your project URL and anon key
3. Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 2. Database Migration

Run the following SQL in your Supabase SQL editor to create the leads table:

```sql
-- Copy the contents from supabase/migrations/create_leads_table.sql
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Run Development Server

```bash
npm run dev
```

## Testing the Form

### Using Test Data Generator

In development mode, you'll see a yellow test data generator bar above the form with buttons to fill in different user profiles:

- **Random Test Data**: Generates random realistic test data
- **WAEC Graduate**: Data for fresh WAEC graduates
- **Undergraduate**: Data for current undergraduates
- **Graduate**: Data for recent graduates
- **Professional**: Data for working professionals

### Manual Testing

Fill out the form manually with test data and submit to verify:

1. Form validation works correctly
2. Data is stored in Supabase
3. Success message displays properly
4. Error handling works for network issues

### Verifying Data Storage

1. Go to your Supabase dashboard
2. Navigate to Table Editor
3. Check the `leads` table for submitted entries
4. Verify all form fields are properly stored

## Form Fields

The form captures the following information:

**Step 1: Personal Information**

- First Name
- Last Name
- Email Address
- Phone Number

**Step 2: Education Background**

- Current Education Level
- Current/Previous Institution
- Graduation Year

**Step 3: Study Preferences**

- Preferred Program Level
- Field of Study
- Preferred Universities (optional)
- Intended Start Date

**Step 4: Final Details**

- Passport Status
- Previous Applications
- Budget Range
- Additional Questions (optional)

## Validation Rules

- Names: Minimum 2 characters
- Email: Valid email format
- Phone: Valid international phone format
- Required fields must be filled
- Real-time validation with error messages

## Error Handling

- Network errors are caught and displayed
- Supabase errors are handled gracefully
- Form validation prevents invalid submissions
- Loading states during submission
- Clear error messages for users

## Deployment

1. Build the project: `npm run build`
2. Deploy to your preferred hosting platform
3. Ensure environment variables are set in production
4. Test form submission in production environment

## Support

For issues or questions, contact the development team or check the Supabase documentation for database-related issues.

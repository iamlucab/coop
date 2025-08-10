# App Store Submission Guide for E-bili Mobile

This guide provides detailed instructions for preparing and submitting the E-bili Mobile app to both the Google Play Store and Apple App Store.

## Prerequisites

- Completed production builds (refer to the production-build-guide.md)
- Google Play Developer account ($25 one-time fee)
- Apple Developer account ($99/year)
- App marketing materials (screenshots, descriptions, etc.)
- Privacy policy document
- Terms of service document

## Google Play Store Submission

### 1. Prepare Store Listing Assets

#### Required Assets:
- **App Icon**: 512x512 PNG (32-bit with alpha)
- **Feature Graphic**: 1024x500 PNG
- **Screenshots**: At least 2 screenshots for each supported device type
  - Phone: minimum 2 screenshots (16:9 aspect ratio recommended)
  - Tablet: minimum 2 screenshots (if supporting tablets)
  - TV: minimum 2 screenshots (if supporting Android TV)
  - Wear: minimum 2 screenshots (if supporting Wear OS)

#### Text Content:
- **App Name**: Up to 50 characters
- **Short Description**: Up to 80 characters
- **Full Description**: Up to 4000 characters
- **App Category**: Select the most appropriate category (e.g., Shopping)
- **Content Rating**: Complete the rating questionnaire
- **Contact Information**: Email address, website, phone number

### 2. Create a New App in Google Play Console

1. Log in to [Google Play Console](https://play.google.com/console/)
2. Click "Create app"
3. Enter app details:
   - App name
   - Default language
   - App or game
   - Free or paid
   - Confirm developer program policies

### 3. Complete App Content Details

1. **App Access**: Specify if the app is restricted to specific users
2. **Ads**: Declare if your app contains ads
3. **Content Rating**: Complete the questionnaire to get an appropriate rating
4. **Target Audience**: Specify age groups and confirm if app appeals to children
5. **News App**: Declare if your app is a news app (likely "No" for E-bili)
6. **COVID-19 Info**: Declare if your app contains COVID-19 information (likely "No")
7. **Data Safety**: Complete the data safety form
   - Declare what data your app collects
   - Explain how the data is used
   - Describe security practices

### 4. Set Up Store Listing

1. Fill in all required fields:
   - App name
   - Short description
   - Full description
   - Upload all graphic assets
   - Add contact details
   - Link to privacy policy

2. Add translations if supporting multiple languages

### 5. Set Up App Release

1. Navigate to "Production" track (or choose a testing track first)
2. Create a new release
3. Upload your AAB file (preferred) or APK
4. Add release notes
5. Review and start rollout

### 6. Set Pricing & Distribution

1. Select countries where the app will be available
2. Confirm the app meets content guidelines for each country
3. Set the app as free or paid
4. Confirm the app doesn't contain ads for inappropriate content

### 7. Submit for Review

1. Review all information for accuracy
2. Click "Submit for review"
3. Wait for Google's review (typically 1-3 days)

## Apple App Store Submission

### 1. Prepare App Store Connect

1. Log in to [App Store Connect](https://appstoreconnect.apple.com/)
2. Click "My Apps"
3. Click the "+" button and select "New App"
4. Fill in the required information:
   - Platform (iOS)
   - App name
   - Primary language
   - Bundle ID (must match your Xcode project)
   - SKU (unique identifier for your app)

### 2. Prepare App Information

#### Required Assets:
- **App Icon**: 1024x1024 PNG (no alpha channel, no transparency)
- **Screenshots**: At least one screenshot for each supported device
  - iPhone: 6.5" display, 5.5" display, etc.
  - iPad: 12.9" display, 11" display, etc.
  - Each screenshot should be in PNG or JPEG format

#### Text Content:
- **App Name**: Up to 30 characters
- **Subtitle**: Up to 30 characters
- **Promotional Text**: Up to 170 characters (can be changed without app update)
- **Description**: Up to 4000 characters
- **Keywords**: Up to 100 characters (comma-separated)
- **Support URL**: Link to support website
- **Marketing URL**: Link to marketing website (optional)
- **Privacy Policy URL**: Link to privacy policy (required)

### 3. Set Up App Information in App Store Connect

1. Navigate to the "App Information" tab
2. Fill in all required fields:
   - Category (Primary and Secondary)
   - Content Rights
   - Age Rating (complete the questionnaire)

### 4. Set Up Pricing and Availability

1. Navigate to the "Pricing and Availability" tab
2. Set the price (or free)
3. Select availability by territory
4. Set volume purchase program availability (if applicable)

### 5. Prepare for Submission

1. Navigate to the "iOS App" tab
2. Under "Build", select the build you uploaded from Xcode
3. Complete all required fields:
   - Version Information
   - App Review Information (contact person, notes, etc.)
   - Version Release (automatic or manual)
   - Routing App Coverage File (if applicable)

### 6. Upload Screenshots and App Preview

1. Navigate to the "Media" section
2. Upload all required screenshots for each device size
3. Add app preview videos (optional)

### 7. Submit for Review

1. Ensure all required fields are completed
2. Click "Submit for Review"
3. Answer the export compliance questions
4. Wait for Apple's review (typically 1-3 days, but can be longer)

## App Store Optimization (ASO)

### Keywords and Description

1. **Research Keywords**: Use ASO tools to find relevant keywords with high search volume and low competition
2. **Optimize App Title**: Include primary keywords in your app name
3. **Craft Compelling Descriptions**:
   - Highlight key features and benefits
   - Use bullet points for readability
   - Include call-to-action
   - Incorporate keywords naturally

### Visual Assets

1. **Create Eye-Catching Icons**: Simple, recognizable design that stands out
2. **Design Compelling Screenshots**:
   - Showcase key features
   - Add captions to explain benefits
   - Use device frames
   - Follow a consistent style
3. **Create App Preview Videos**: Short, engaging videos demonstrating core functionality

## Post-Submission

### Monitor Review Status

1. Check the status in Google Play Console or App Store Connect
2. Be prepared to address any issues raised by reviewers

### After Approval

1. Monitor app performance and user feedback
2. Respond to user reviews
3. Plan for updates based on feedback and analytics

### Common Rejection Reasons

#### Google Play Store:
- Violation of intellectual property rights
- Misleading or deceptive content
- Inappropriate content
- Poor user experience
- Security vulnerabilities

#### Apple App Store:
- Incomplete information
- Bugs and crashes
- Broken links
- Misleading descriptions
- Privacy concerns
- Payment issues
- Poor user interface

## Checklist Before Submission

- [ ] App passes all internal testing
- [ ] All placeholder content has been replaced
- [ ] App icon and screenshots are finalized
- [ ] App description and metadata are complete
- [ ] Privacy policy is accessible and compliant with regulations
- [ ] Terms of service are accessible
- [ ] Contact information is accurate
- [ ] All required content ratings questionnaires are completed
- [ ] App complies with all store guidelines
- [ ] In-app purchases (if any) are properly configured
- [ ] Analytics are properly implemented
- [ ] Crash reporting is properly implemented

## Regulations and Compliance

### GDPR (European Union)
- Obtain explicit consent for data collection
- Provide options to access, modify, and delete user data
- Disclose all data collection practices

### CCPA (California)
- Disclose what personal information is collected
- Allow users to opt-out of data selling
- Provide "Do Not Sell My Personal Information" option

### COPPA (Children's Privacy)
- If targeting children under 13, obtain parental consent
- Limit data collection to what is necessary

## Useful Resources

- [Google Play Console Help](https://support.google.com/googleplay/android-developer/)
- [App Store Review Guidelines](https://developer.apple.com/app-store/review/guidelines/)
- [App Store Connect Help](https://help.apple.com/app-store-connect/)
- [Google Play Developer Policy Center](https://play.google.com/about/developer-content-policy/)
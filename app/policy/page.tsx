import React from "react";
import { PageHeader } from "@/components/PageHeader";

function PolicyPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <PageHeader
        title="Privacy Policy"
        description="How we collect, use, and protect your personal information"
      />

      <div className="prose prose-gray dark:prose-invert max-w-none">
        <ol className="space-y-4">
          <li>
            <strong>Data Collection:</strong> We collect personal information
            such as names, contact details, and profile information from users who
            register on our platform. Additionally, user-generated content such as
            images may be collected and stored on our servers.
          </li>
          <li>
            <strong>Use of Information:</strong> The information collected is
            used to facilitate communication and interaction among church youth
            members. User profiles allow for easy access to contact information
            and updates within the community.
          </li>
          <li>
            <strong>Data Storage and Security:</strong> User data, including
            personal information and images, is stored securely on MongoDB
            databases and S3 cloud servers. We employ industry-standard security
            measures to protect against unauthorized access or misuse of data.
          </li>
          <li>
            <strong>Sharing of Information:</strong> User information is not
            shared with third parties without explicit consent. However,
            user-generated content may be visible to other registered users within
            the platform.
          </li>
          <li>
            <strong>Access and Control:</strong> Users have the right to
            access, update, or delete their personal information stored on our
            platform. They can do so by accessing their profile settings or
            contacting the site administrator.
          </li>
          <li>
            <strong>Consent:</strong> By using our platform and providing
            personal information, users consent to the collection, storage, and
            use of their data as outlined in this Privacy Policy.
          </li>
          <li>
            <strong>Changes to Policy:</strong> We reserve the right to update
            or modify this Privacy Policy at any time. Users will be notified of
            any changes, and continued use of the platform constitutes acceptance
            of the revised policy.
          </li>
        </ol>

        <div className="mt-8 p-4 bg-muted rounded-lg">
          <strong>Platform Context:</strong> The web app serves as a
          centralized platform for church youth members, including 12 main youth
          leaders, 17 leaders of group divisions, and other active members, to
          connect and communicate effectively. Users can create profiles, update
          their contact information, and contribute to the community by sharing
          updates and announcements. All data, including personal information
          and images, is securely stored on MongoDB databases and S3 cloud
          servers. The platform prioritizes user privacy and employs
          industry-standard security measures to safeguard sensitive
          information.
        </div>
      </div>
    </div>
  );
}

export default PolicyPage;

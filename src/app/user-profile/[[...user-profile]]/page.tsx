"use client";
import { FaAddressBook } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";

import { UserProfile } from "@clerk/nextjs";

const UserProfilePage = () => (
  <section className="container flex justify-center">
    <UserProfile path="/user-profile" routing="path">
      <UserProfile.Page
        label="Custom Page"
        url="custom"
        labelIcon={<FaAddressBook />}
      >
        <div>Test</div>
      </UserProfile.Page>
      <UserProfile.Link label="Homepage" url="/home" labelIcon={<FaHome />} />
      <UserProfile.Page label="account" />
      <UserProfile.Page label="security" />
    </UserProfile>
  </section>
);

export default UserProfilePage;

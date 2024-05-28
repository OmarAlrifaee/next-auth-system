"use client";
const ProfileError = ({ error }: { error: Error }) => {
  console.log(error);
  return <div>Profile Error</div>;
};
export default ProfileError;

type UserProfileProps = {
  params: {
    id: string;
  };
};
const UserProfile = ({ params }: UserProfileProps) => {
  return <div>{params.id}</div>;
};
export default UserProfile;

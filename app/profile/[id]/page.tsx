// type Props = {
//   params: Promise<{ id: string }>;
// };

export default async function UserProfile({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">Profile</h1>
      <hr className="my-4" />
      <p className="text-2xl">
        Profile Page of user with id:{" "}
        <span className="text-blue-500 font-semibold">{id}</span>
      </p>
    </div>
  );
}

export default async function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div>
            <main className="flex-1 w-full min-h-screen">
                <div className="px-4 py-2">{children}</div>
            </main>
        </div>
    );
}

export default async function Page() {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return (
        <>
            <h1>To do list is here .</h1>
        </>
    );
}
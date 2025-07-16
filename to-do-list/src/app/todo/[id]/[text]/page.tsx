interface PageProps {
    params: {
        id: string;
        text: string;
    };
}

export default async function Page(
    { params }: PageProps
) {
    const awaitedParams = await params;

    return (
        <>
            <p>
                This is a dynamic page for slug: <strong>{awaitedParams.id} - {awaitedParams.text}</strong>.
            </p>
        </>
    );
}

// | Syntax         | ใช้ทำอะไร                               |
// | -------------- | ---------------------------------------|
// | `[param]`      | รับค่า param จาก URL (`/user/123`)       |
// | `[...param]`   | รับหลาย segment เป็น array (`/a/b/c`)    |
// | `[[...param]]` | แบบ optional (มีหรือไม่มี segment ก็ได้)     |
// | `(group)`      | จัดกลุ่มไฟล์โดยไม่ส่งผลต่อ URL               |
// | `@name`        | สำหรับ parallel route (ขั้นสูง)            |

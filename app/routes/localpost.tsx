import {
    ActionFunctionArgs,
    redirect,
    unstable_composeUploadHandlers,
    unstable_createMemoryUploadHandler,
    unstable_parseMultipartFormData
} from "@remix-run/node";

async function readStream(stream: AsyncIterable<Uint8Array>) {
    const chunks = [];

    for await (const chunk of stream) {
        chunks.push(chunk);
    }

    const buffer = Buffer.concat(chunks);
    return buffer.toString('base64');
}

export async function action({
    request,
}: ActionFunctionArgs) {

    const uploadHandler = unstable_composeUploadHandlers(
        // our custom upload handler
        async ({ name, contentType, data }) => {
            if (name !== "imgfile") {
                return undefined;
            }
            const base64Image = await readStream(data);
            const dataUrl = `data:${contentType};base64,${base64Image}`;
            return dataUrl;
        },
        // fallback to memory for everything else
        unstable_createMemoryUploadHandler()
    );

    const formData = await unstable_parseMultipartFormData(
        request,
        uploadHandler
    );
    const imgfile = `${formData.get("imgfile")}`;
    const viewUrl = `/view.html?url=${encodeURIComponent(imgfile)}`;

    return redirect(viewUrl);
}

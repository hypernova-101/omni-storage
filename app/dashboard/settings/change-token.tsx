import { Button } from "@/components/ui/button"
import { currentUser } from "@clerk/nextjs/server";
import { Save } from "lucide-react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

function ChangeToken() {

    const changeToken = async (formData: FormData) => {
        'use server';

        let token = formData.get('token');
        if(token) {
            const year = 365 * 24 * 60 * 60 * 1000;
            cookies().set('token', token.toString(), { secure: true, expires: Date.now() + year})
        }

        redirect('/dashboard/settings')
    }

    return (
        <form className="flex flex-col gap-4" action={changeToken}>
            <input
                type="text"
                name="token"
                id="token"
                required
                placeholder="Enter access token"
                className='py-2 px-4 rounded-xl border w-full'
            />
            <Button className="gap-3">
                <Save size={18}/>
                Save Changes
            </Button>
        </form>
    )
}

export default ChangeToken

import { NextRequest, NextResponse } from "next/server";  

export async function GET(req: NextRequest) {
    return NextResponse.json({})
}    
//     let token = cookies().get('token')
//     let iD = cookies().has('token')

//     return NextResponse.json({
//         'token':token?.value,
//         'has': iD     
//     })
    
    // const code = req.nextUrl.searchParams.get('code')

    // if (code) {
    //     const res = await getAccessToken(code)

    //     const octokit = new Octokit({
    //         auth: res.access_token
    //     })

    //     const result = await octokit.request('GET /user')
    //     console.log(result.data);
        

    //     return NextResponse.redirect(`http://localhost:3000/dashboard?token=${res.access_token}`)
    // }

    // return NextResponse.json({ 'message': 'no code received' })
// }

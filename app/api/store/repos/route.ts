import { NextRequest, NextResponse } from "next/server"
import { Octokit } from "octokit"

export async function DELETE(req: NextRequest) {

    let token = req.cookies.get('token')
    if (!token) {
        return NextResponse.json({}, { status: 401 })
    }

    try {
        const octokit = new Octokit({ auth: token.value })
        let res = await octokit.request('DELETE /repos/{owner}/{repo}', {
            owner: req.headers.get('owner')!,
            repo: req.headers.get('repo')!,
        })

        return NextResponse.json(res.data, { status: res.status })
    } catch {
        return NextResponse.json({}, { status: 401 })
    }
}

export async function POST(req: NextRequest) {

    let token = req.cookies.get('token')

    if (!token) {
        return NextResponse.json({}, { status: 401 })
    }

    let isPrivate = req.headers.get('private')!

    try {
        const octokit = new Octokit({ auth: token.value })
        const res = await octokit.request('POST /user/repos', {
            name: `${req.headers.get('name')!}`,
            description: req.headers.get('description')!,
            private: isPrivate === "true" ? true : false
        })

        return NextResponse.json(res.data, { status: res.status })
    } catch {

        return NextResponse.json({}, { status: 401 })
    }
}

export async function GET(req: NextRequest) {
    let token = req.cookies.get('token')
    if (token?.value === undefined) {
        console.log(token);

        return NextResponse.json(token, { status: 401 })
    }

    try {
        const octokit = new Octokit({ auth: token!.value })
        let res = await octokit.request('GET /user/repos')

        let data: any[] = []

        res.data.map((repo) => data.push({
            'name': repo.name,
            'full_name': repo.full_name,
            'id': repo.id,
            'private': repo.private,
            'size': repo.size,
            'created_at': repo.created_at,
            'updated_at': repo.updated_at,
        }))
        console.log(data);
        
        return NextResponse.json(data, { status: 200 })
    } catch {
        return NextResponse.json({}, { status: 401 })
    }
}
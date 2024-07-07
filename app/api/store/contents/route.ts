import { NextRequest, NextResponse } from "next/server";
import { Octokit } from "octokit";

export async function DELETE(req: NextRequest) {

    let token = req.cookies.get('token')
    if(!token) {
        return NextResponse.json({}, { status: 401 })
    }

    const octokit = new Octokit({ auth: token.value })

    try {

        let res = await octokit.request('DELETE /repos/{owner}/{repo}/contents/{path}', {
            owner: req.headers.get('owner')!,
            message: req.headers.get('message')!,
            repo: req.headers.get('repo')!,
            path: req.headers.get('path')!,
            sha: req.headers.get('sha')!
        })
        return NextResponse.json(res.data, { status: res.status })
    } catch {
        return NextResponse.json({}, { status: 401 })
    }
}

export async function PUT(req: NextRequest) {
    
    let token = req.cookies.get('token')
    if(!token) {
        return NextResponse.json({}, { status: 401 })
    }

    const json = await req.json()

    try {
        const octokit = new Octokit({ auth: token.value });

        const res = await octokit.request("PUT /repos/{owner}/{repo}/contents/{path}", {
            content: json.content,
            message: json.message,
            owner: json.owner,
            path: json.path,
            repo: json.repo,
        })

        return NextResponse.json({ 'message': 'completed' }, { status: res.status })


    } catch (e) {
        console.log(e);

    }
    return NextResponse.json({}, { status: 401 })
}

export async function GET(req: NextRequest) {
    
    let token = req.cookies.get('token')
    if(!token) {
        return NextResponse.json({}, { status: 401 })
    }


    let full_name = req.headers.get('full_name')
    let path = req.headers.get('path') ?? ''

    if (!full_name) {

        return NextResponse.json({}, { status: 401 })
    }

    let [owner, repo] = full_name.split('/')

    try {
        const octokit = new Octokit({ auth: token.value })
        let res = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
            owner: owner,
            repo: repo,
            path: path
        })

        return NextResponse.json(res.data, { status: 200 })
    } catch {
        return NextResponse.json({}, { status: 401 })
    }
}
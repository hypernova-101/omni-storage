'use server';

import { Content } from "@/app/dashboard/modals"
import { cookies } from "next/headers"
import { Octokit } from "octokit"

export async function getContents(full_name: string, path?: string): Promise<Content[]> {
    let token = cookies().get('token')
    
    if(!token) {
        return []
    }

    if (!full_name) {
        return []
    }

    let [owner, repo] = full_name.split('/')

    try {
        const octokit = new Octokit({ auth: token.value })
        let res = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
            owner: owner,
            repo: repo,
            path: path ? path : ""
        })

        return res.data as Content[]
    } catch {
        return []
    }
}

export async function deleteContent(owner: string, message: string, repo: string, path: string, sha: string) {
    let token = cookies().get('token')
    if(!token) {
        return "no token"
    }

    const octokit = new Octokit({ auth: token.value })

    try {
        await octokit.request('DELETE /repos/{owner}/{repo}/contents/{path}', {
            owner: owner,
            message: message,
            repo: repo,
            path: path,
            sha: sha
        })
        return "success"
    } catch {
        return "failed"
    }
}
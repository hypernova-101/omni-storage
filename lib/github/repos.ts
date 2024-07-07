'use server';

import { Repo } from "@/app/dashboard/modals";
import { cookies } from "next/headers";
import { Octokit } from "octokit";

export async function getRepos(): Promise<Repo[]> {
    let token = cookies().get('token')
    if (token?.value === undefined) {
        return [];
    }

    try {
        const octokit = new Octokit({ auth: token!.value })
        let res = await octokit.request('GET /user/repos')

        let data: Repo[] = []

        res.data.map((repo) => data.push({
            'name': repo.name,
            'full_name': repo.full_name,
            'id': repo.id,
            'private': repo.private,
            'size': repo.size,
            'created_at': repo.created_at!,
            'updated_at': repo.updated_at!,
        }))
        
        return data
    } catch {
        return []
    }
}

export async function deleteRepo(owner: string, repo: string) {
    let token = cookies().get('token')
    if (!token) {
        return "no auth token"
    }

    try {
        const octokit = new Octokit({ auth: token.value })
        let res = await octokit.request('DELETE /repos/{owner}/{repo}', {
            owner: owner,
            repo: repo,
        })
        return "success"
    } catch {
        return "failed"
    }    
}

export async function postRepo(isPrivate: boolean, name: string, description: string) {
    let token = cookies().get('token')

    if (!token) {
        return null
    }

    try {
        const octokit = new Octokit({ auth: token.value })
        const res = await octokit.request('POST /user/repos', {
            name: name,
            description: description,
            private: isPrivate
        })

        return res.data.url
    } catch {
        return null
    }
}
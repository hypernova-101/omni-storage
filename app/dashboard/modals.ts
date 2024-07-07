export interface Repo {
    name: string,
    full_name: string,
    id: number,
    private: boolean,
    size: number,
    created_at: string,
    updated_at: string
}

export interface Content {
    name: string,
    path: string,
    sha: string,
    size: number,
    url: string,
    html_url: string,
    git_url: string,
    download_url: string,
    type: string
    _links: {
        self: string,
        git: string,
        html: string
    }
}
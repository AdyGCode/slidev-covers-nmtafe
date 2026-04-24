import fs from 'fs'
import yaml from 'js-yaml'

const approved = yaml.load(
    fs.readFileSync('metadata/approved-images.yml', 'utf8')
) as any

const manifest: Record<string, string[]> = {}

for (const img of approved.approved) {
    const [category] = img.path.split('/')
    manifest[category] ??= []
    manifest[category].push(`covers/approved/${img.path}`)
}

fs.writeFileSync(
    'docs/index.json',
    JSON.stringify(manifest, null, 2)
)

console.log('✅ Manifest generated for GitHub Pages')

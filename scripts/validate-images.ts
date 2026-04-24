import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'

const approved = yaml.load(
    fs.readFileSync('metadata/approved-images.yml', 'utf8')
) as any

for (const img of approved.approved) {
    if (!img.alt) {
        throw new Error(`Missing alt text: ${img.path}`)
    }

    const fullPath = path.join('docs/covers/approved', img.path)
    if (!fs.existsSync(fullPath)) {
        throw new Error(`Missing file: ${img.path}`)
    }
}

console.log('✅ Approved images validated')

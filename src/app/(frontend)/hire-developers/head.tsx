import { SeoSchema } from '@/components/SeoSchema'
import { resolveSchemaByPath } from '@/lib/getResolvedSchema'

export const dynamic = 'force-dynamic'

export default async function Head() {
  const schema = await resolveSchemaByPath('/hire-developers')

  return (
    <>
      {schema && <SeoSchema schema={schema} />}
    </>
  )
}

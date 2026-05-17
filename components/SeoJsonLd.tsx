type JsonLdData = Record<string, unknown> | Array<Record<string, unknown>>;

type SeoJsonLdProps = {
    data: JsonLdData;
};

export default function SeoJsonLd({ data }: SeoJsonLdProps) {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
    );
}

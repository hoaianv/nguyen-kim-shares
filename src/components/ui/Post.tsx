export default function Post({ data }: { data: string }) {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: data || "",
      }}
      className="
        prose prose-sm sm:prose md:prose-lg w-full !max-w-none
        prose-headings:text-slate-900 prose-headings:font-semibold prose-headings:leading-tight
        prose-h1:text-2xl sm:prose-h1:text-3xl lg:prose-h1:text-4xl prose-h1:mt-8 prose-h1:mb-6 first:prose-h1:mt-0
        prose-h2:text-xl sm:prose-h2:text-2xl lg:prose-h2:text-3xl prose-h2:mt-8 prose-h2:mb-4 prose-h2:pb-2 prose-h2:border-b prose-h2:border-slate-200
        prose-h3:text-lg sm:prose-h3:text-xl lg:prose-h3:text-2xl prose-h3:mt-6 prose-h3:mb-3
        prose-p:text-slate-700 sm:prose-p:text-lg prose-p:leading-relaxed prose-p:mb-5 first:prose-p:mt-0 last:prose-p:mb-0
        prose-strong:text-slate-900 prose-strong:font-medium prose-em:text-slate-600
        prose-ul:list-disc prose-ol:list-decimal prose-li:text-slate-700 sm:prose-li:text-lg prose-li:leading-relaxed prose-li:mb-2
        prose-img:block prose-img:mx-auto
        prose-img:!w-auto prose-img:max-w-full prose-img:h-auto
        prose-img:rounded-lg prose-img:shadow-lg prose-img:mt-6 prose-img:mb-8
        prose-img:max-h-[280px] sm:prose-img:max-h-[380px] md:prose-img:max-h-[480px] lg:prose-img:max-h-[580px]
        [&_img[style*='width']]:max-w-full
        [&_img[style*='height']]:h-auto
        prose-a:text-blue-600 hover:prose-a:text-blue-700 hover:prose-a:underline
        [&_a:focus]:outline-2 [&_a:focus]:outline-blue-500 [&_a:focus]:outline-offset-2
        prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50
        prose-blockquote:rounded-r-lg prose-blockquote:py-4 prose-blockquote:my-6
        prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm
        prose-pre:bg-slate-900 prose-pre:text-slate-100 prose-pre:rounded-lg prose-pre:p-4 prose-pre:my-6 prose-pre:overflow-x-auto
        overflow-x-auto [-webkit-overflow-scrolling:touch] mx-0 px-0
        [&_table]:!w-auto [&_table]:!h-auto [&_table]:!max-w-full
        [&_table]:!ml-0 [&_table]:!mr-0
        [&_table_*]:!w-auto [&_table_*]:!h-auto
        [&_table[style*='width']]:!w-auto [&_table[width]]:!w-auto
        [&_table]:block [&_table]:w-full [&_table]:max-w-full [&_table]:overflow-x-auto
        md:[&_table]:table md:[&_table]:overflow-visible
        [&_table]:border-collapse [&_table]:bg-white
        md:[&_table]:min-w-[1200px]
        [&_table]:text-sm sm:[&_table]:text-base
        [&_thead_th]:bg-slate-50 [&_thead_th]:sticky [&_thead_th]:top-0 [&_thead_th]:z-[1]
        [&_thead_th]:text-left [&_thead_th]:font-semibold
        [&_thead_th]:p-3 [&_th]:border [&_th]:border-slate-200
        [&_td]:p-3 [&_td]:align-top [&_td]:text-slate-700 [&_td]:border [&_td]:border-slate-200
        [&_th]:whitespace-normal [&_td]:whitespace-normal break-words
        [&_tbody_tr:hover]:bg-slate-50
        md:[&_thead_th:first-child]:sticky md:[&_thead_th:first-child]:left-0 md:[&_thead_th:first-child]:z-[2]
        md:[&_tbody_td:first-child]:sticky md:[&_tbody_td:first-child]:left-0 md:[&_tbody_td:first-child]:z-[1]
        [&_thead_th:first-child]:bg-white [&_tbody_td:first-child]:bg-white
        [&_iframe]:w-full [&_iframe]:rounded-lg [&_iframe]:my-6 [&_iframe]:aspect-video
        [&_p.MsoListParagraph]:[text-indent:0!important]
        [&_p.MsoListParagraph]:!ml-0 [&_p.MsoListParagraph]:!mr-0
        [&_p.MsoListParagraph[style*='text-indent']]:[text-indent:0!important]
        [&_p.MsoListParagraph[style*='margin-left']]:!ml-0
        [&_p.MsoListParagraph[style*='margin-right']]:!mr-0
        [&_p.MsoListParagraph_*[style*='text-indent']]:[text-indent:0!important]
        [&_p.MsoListParagraph_*[style*='margin-left']]:!ml-0
        [&_p.MsoListParagraph]:break-words [&_p.MsoListParagraph]:whitespace-normal
        [&_p.MsoListParagraph_*[style*='mso-list']]:inline-block
        [&_p.MsoListParagraph_*[style*='mso-list']]:align-middle
        [&_p.MsoListParagraph]:pl-2
        print:prose-sm print:text-slate-900 print:bg-white
      "
    />
  );
}

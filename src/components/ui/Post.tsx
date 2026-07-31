import RichContent from "@/components/ui/RichContent";

export default function Post({ data }: { data: string }) {
  return (
    <RichContent
      data={data}
      className="
        prose prose-sm sm:prose-base w-full !max-w-none
        prose-headings:text-slate-900 prose-headings:font-semibold prose-headings:leading-snug
        prose-h1:text-xl sm:prose-h1:text-2xl lg:prose-h1:text-2xl prose-h1:mt-6 prose-h1:mb-4 first:prose-h1:mt-0
        prose-h2:text-lg sm:prose-h2:text-xl lg:prose-h2:text-xl prose-h2:mt-6 prose-h2:mb-3 prose-h2:pb-1.5 prose-h2:border-b prose-h2:border-slate-200
        prose-h3:text-base sm:prose-h3:text-lg lg:prose-h3:text-lg prose-h3:mt-5 prose-h3:mb-2
        prose-p:text-sm sm:prose-p:text-base prose-p:leading-7 prose-p:mb-4 first:prose-p:mt-0 last:prose-p:mb-0
        prose-strong:text-slate-900 prose-strong:font-medium prose-em:text-slate-600
        prose-ul:list-disc prose-ol:list-decimal prose-li:text-slate-700 sm:prose-li:text-base prose-li:leading-7 prose-li:mb-1.5
        prose-img:block prose-img:mx-auto prose-img:!w-auto prose-img:max-w-full prose-img:h-auto
        prose-img:bg-transparent prose-img:shadow-none prose-img:mt-6 prose-img:mb-8
        prose-img:max-h-[280px] sm:prose-img:max-h-[380px] md:prose-img:max-h-[480px] lg:prose-img:max-h-[580px]
        [&_img[style*='width']]:max-w-full [&_img[style*='height']]:h-auto
        prose-a:text-blue-600 hover:prose-a:text-blue-700 hover:prose-a:underline
        [&_a:focus]:outline-2 [&_a:focus]:outline-blue-500 [&_a:focus]:outline-offset-2
        prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50 prose-blockquote:rounded-r-lg prose-blockquote:py-4 prose-blockquote:my-6
        prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm
        prose-pre:bg-slate-900 prose-pre:text-slate-100 prose-pre:rounded-lg prose-pre:p-4 prose-pre:my-6 prose-pre:overflow-x-auto
        break-words mx-0 px-0
        [&_iframe]:w-full [&_iframe]:rounded-lg [&_iframe]:my-6 [&_iframe]:aspect-video
        [&_p.MsoListParagraph]:[text-indent:0!important] [&_p.MsoListParagraph]:!ml-0 [&_p.MsoListParagraph]:!mr-0
        [&_p.MsoListParagraph[style*='text-indent']]:[text-indent:0!important]
        [&_p.MsoListParagraph[style*='margin-left']]:!ml-0 [&_p.MsoListParagraph[style*='margin-right']]:!mr-0
        [&_p.MsoListParagraph_*[style*='text-indent']]:[text-indent:0!important]
        [&_p.MsoListParagraph_*[style*='margin-left']]:!ml-0 [&_p.MsoListParagraph]:break-words [&_p.MsoListParagraph]:whitespace-normal
        [&_p.MsoListParagraph_*[style*='mso-list']]:inline-block [&_p.MsoListParagraph_*[style*='mso-list']]:align-middle [&_p.MsoListParagraph]:pl-2
        print:prose-sm print:text-slate-900 print:bg-white
      "
    />
  );
}

module Jekyll
  class SnippetFilenameConverter < Converter
    safe :false
    priority :high

    def matches(ext)
      ext =~ /^\.(md|markdown)$/i
    end

    def output_ext(ext)
      ".html"
    end

    def convert(content)
      if content.match(/^```.+\..+$/)
        lines = content.lines
        content = lines.map do |line|
          if matches = line.match(/\A(```)(.+\.(.+))\Z/)
            "#{matches[1]}"
          else
            line
          end
        end.join
      end
      site = Jekyll::Site.new(@config)
      default_converter = site.getConverterImpl(Jekyll::Converters::Markdown)
      default_converter.convert(content)
    end
  end
end

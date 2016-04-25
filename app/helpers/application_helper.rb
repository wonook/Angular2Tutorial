module ApplicationHelper
    def path_to_javascript(source, path_options)
        gulp_asset_path source
    end

    def path_to_stylesheet(source, path_options)
        gulp_asset_path source
    end

    def path_to_image(source, path_options)
        gulp_asset_path "images/#{source}"
    end

    private

    def gulp_asset_path(path)
        "/assets/#{path}"
    end
end

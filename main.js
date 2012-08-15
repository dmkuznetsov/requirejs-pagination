/**
 * @description repo/Pagination/main
 * settings {
 *  current: number of current page
 *  count: count of all pages
 *  link: link
 *  distance: distance before and after ...
 *  selector: selector of placeholder
 * }
 */
define([
    'jquery'
    , 'text!./templates/main.html'
    , 'css!./skin/main'
    , 'underscore'
], function( $, tplMain ) {
    return function( settings ) {

        function init() {
            var start = 0, finish = 0;

            if ( settings.count == undefined ) {
                throw new Error( "Undefined variable \"count\"" );
            };
            if ( settings.link == undefined ) {
                throw new Error( "Undefined variable \"link\"" );
            };
            if ( settings.selector == undefined ) {
                throw new Error( "Undefined variable \"selector\"" );
            };

            if ( settings.current == undefined ) {
                settings.current = 0;
            };
            if ( settings.distance == undefined ) {
                settings.distance = 1;
            };

            settings.current = parseInt( settings.current );
            settings.distance = parseInt( settings.distance );
            settings.count = parseInt( settings.count );

            if ( settings.count == 1 ) {
                $( settings.selector ).html( '' );
                return;
            };

            if ( settings.current < 0 ) {
                settings.current = 0;
            };

            // Если переменная settings.current > количества страниц ссылаем на последнюю страничку
            if ( settings.current > settings.count - 1 ) {
                settings.current = settings.count - 1;
            };

            // С какого номера начинать вывод
            if ( settings.current > settings.distance ) {
                start = settings.current - settings.distance;
            };

            // Каким номером заканчивать вывод
            finish = settings.current + settings.distance;
            if ( finish > settings.count - 1 ) {
                finish = settings.count - 1;
            };

            $( settings.selector ).html( _.template( tplMain, {
                'current': settings.current
                , 'count': settings.count
                , 'link': settings.link
                , 'start': start
                , 'finish': finish
            } ) );
        };

        init();
    };
});

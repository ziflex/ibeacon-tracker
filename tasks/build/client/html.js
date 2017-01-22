import path from 'path';

export default function factory($, env) {
    return function task() {
        const targetSrc = path.join(
            env.paths.input.client.html,
            'index.html'
        );
        const target = $.gulp.src(targetSrc);

        const files = [];
        const scripts = env.paths.output.client.scripts;
        files.push(path.join(scripts, '**/*.js'));

        const styles = env.paths.output.client.styles;

        if (styles) {
            files.push(path.join(styles, '**/*.css'));
        }

        const sources = $.gulp.src(files, { read: false });

        return target
            .pipe($.inject(sources, {
                ignorePath: 'dist/public',
                addRootSlash: true
            }))
            .pipe($.gulp.dest(env.paths.output.client.html));
    };
}

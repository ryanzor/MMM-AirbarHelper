<a name="Linter"></a>

## Linter
**Kind**: global class  
**Access**: public  
**Author**: Sagie Gur-Ari  

* [Linter](#Linter)
    * [new Linter()](#new_Linter_new)
    * [#run(grunt, markdownlint)](#Linter+run)

<a name="new_Linter_new"></a>

### new Linter()
Exposes the markdown linting task.

**Example**  
````js
//to use via grunt, first load the task
require('load-grunt-tasks')(grunt); // npm install --save-dev load-grunt-tasks
//or load it manually
grunt.loadNpmTasks('grunt-markdownlint');

grunt.initConfig({
  markdownlint: {
    full: {
      options: {
        config: { //configure the linting rules
          'default': true,
          'line-length': false,
          'blanks-around-headers': false,
          'no-duplicate-header': false,
          'no-inline-html': false
        }
      },
      src: [
        'README.md',
        'docs/api.md'
      ]
    }
  }
});

grunt.registerTask('default', ['markdownlint']);
````
<a name="Linter+run"></a>

### Linter#run(grunt, markdownlint)
Runs the markdown linting task.

**Access**: public  

| Param | Type | Description |
| --- | --- | --- |
| grunt | <code>Object</code> | The grunt object |
| markdownlint | <code>function</code> | The markdownlint library |


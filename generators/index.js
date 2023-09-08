const path = require("path");
const Generator = require("yeoman-generator");

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.option("projectName", {
      description: "Path to JSON file containing project name",
      type: String
    });

    this.option("generateDocusaurus", {
      description: "Generate Docusaurus documentation",
      type: Boolean,
      default: true
    });
  }

  writing() {
    const projectName = this.options.projectName || "MyDocumentation"; // Default project name
    const copyOpts = {
      globOptions: {
        ignore: []
      }
    };

    const options = {
      projectName: projectName
    };

    if (this.options.generateDocusaurus) {
      this._generateDocusaurus(options, copyOpts);
      this._updateDocusaurusConfig(options);
    }

    this._generateOtherFiles(options, copyOpts); 
  }

  _generateDocusaurus(options, copyOpts) {
    this.fs.copyTpl(
      this.templatePath(`docusaurus`), 
      this.destinationPath(`docusaurus-${options.projectName}`),
      options,
      copyOpts
    );
  }
  

  _updateDocusaurusConfig(options) {
    const configPath = this.destinationPath(
      `docusaurus-${options.projectName}/docusaurus.config.js`
    );

    const configContent = this.fs.read(configPath);
    const updatedConfigContent = configContent.replace(
      /title:.*$/m,
      `title: '${options.projectName}',`
    );

    this.fs.write(configPath, updatedConfigContent);
  }

  _generateOtherFiles(options, copyOpts) {
    // Generate other files logic
    const filesToGenerate = [
      "docs/intro.md",
      "docs/Documentation/concept.md",
      // "blog/2019-05-28-five-blog-post",
      "blog/2021-08-01-mdx-blog-post.mdx",
      "src/components/HomepageFeatures/index.js",
      "src/components/HomepageFeatures/styles.module.css",
      "src/css/custom.css",
      "src/pages/index.js",
      "src/pages/index.module.css",
      "src/theme/BlogListPage/Author/index.js",
      "src/theme/BlogListPage/Author/styles.module.css",
      "src/theme/BlogListPage/ListItem/index.js",
      "src/theme/BlogListPage/ListItem/styles.module.css",
      "src/theme/BlogListPage/index.js",
      "src/theme/BlogListPage/styles.module.css",
      "docusaurus.config.js",
      "sidebars.js",
      "package.json",
      "README.md"
    ];

    filesToGenerate.forEach(file => {
      this.fs.copyTpl(
        this.templatePath(`docusaurus/${file}`), // Add a forward slash here
        this.destinationPath(`docusaurus-${options.projectName}/${file}`),
        options,
        copyOpts
      );
    });
  }

  // Other helper methods, prompts, and install logic
};

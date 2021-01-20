const ora = require('ora');

const filesToBeRemoved = ['.git/', '.github/', 'CONTRIBUTING.md'];
const databaseTypes = {
  sql: 'https://github.com/lucas-a-pelegrino/node-bloodboiler-sequelized.git',
  nosql: 'https://github.com/lucas-a-pelegrino/node-bloodboiler.git',
};

module.exports = {
  name: 'new',
  alias: ['n'],
  run: async (toolbox) => {
    const { parameters, print, prompt, system, filesystem } = toolbox;

    const appName = parameters.first;

    print.info('Welcome to bloodboiler CLI 🚀');

    const { database, author, description, version } = await prompt.ask([
      {
        type: 'select',
        name: 'database',
        message: 'Choose which database type you would like to use:',
        choices: ['sql', 'nosql'],
      },
      {
        type: 'input',
        name: 'author',
        message: `What's your name (author)?`,
      },
      {
        type: 'input',
        name: 'description',
        message: `Short description for your project:`,
      },
      {
        type: 'input',
        name: 'version',
        message: `version (1.0.0):`,
        initial: '1.0.0',
      },
    ]);

    const spinner = ora(`🚨 Downloading bloodboiler base...`).start();

    await system.run(`git clone ${databaseTypes[database]} ${appName} --single-branch`);

    spinner.succeed();
    spinner.start('📂 Cleaning up...');

    filesToBeRemoved.forEach(async (file) => {
      await filesystem.remove(`${appName}/${file}`);
    });

    spinner.succeed();
    spinner.start('📦 Installing packages...');
    await system.run(`cd ${appName} && git init && npm install`);
    spinner.succeed();

    print.info('All done! Happy coding! 🚀');
  },
};

const command = {
  name: 'bloodboiler-cli',
  run: async (toolbox) => {
    const { print } = toolbox;

    print.info('Welcome to your CLI');
  },
};

module.exports = command;

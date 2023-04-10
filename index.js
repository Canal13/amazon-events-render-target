const path = require('path');
const core = require('@actions/core');
const tmp = require('tmp');
const fs = require('fs');

async function run() {
  try {
    // Get inputs
    const targetsDefinitionFile = core.getInput('targets-definition', { required: true });
    const taskDefinitionARN = core.getInput('task-definition-arn', { required: true });

    // Parse the targets definition
    const targetsDefPath = path.isAbsolute(targetsDefinitionFile) ?
      targetsDefinitionFile :
      path.join(process.env.GITHUB_WORKSPACE, targetsDefinitionFile);
    if (!fs.existsSync(targetsDefPath)) {
      throw new Error(`Tasgets definition file does not exist: ${targetsDefinitionFile}`);
    }
    const targetsDefContents = require(targetsDefPath);

    // Insert the task definition ARN
    if (!Array.isArray(targetsDefContents.Targets)) {
      throw new Error('Invalid targets definition format: Targets section is not present or is not an array');
    }
    for(i = 0; i < targetsDefContents.Targets.length; i++){
        targetsDefContents.Targets[i].TaskDefinitionArn = taskDefinitionARN;
    }

    // Write out a new targets definition file
    var updatedTargetsDefFile = tmp.fileSync({
      tmpdir: process.env.RUNNER_TEMP,
      prefix: 'targets-definition-',
      postfix: '.json',
      keep: true,
      discardDescriptor: true
    });
    const newTargetsDefContents = JSON.stringify(targetsDefContents, null, 2);
    fs.writeFileSync(updatedTargetsDefFile.name, newTargetsDefContents);
    core.setOutput('targets-definition', updatedTargetsDefFile.name);
  }
  catch (error) {
    core.setFailed(error.message);
  }
}

module.exports = run;

/* istanbul ignore next */
if (require.main === module) {
    run();
}
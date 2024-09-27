import tf from '@tensorflow/tfjs-node'
import { myModel } from './cnn-model'

export async function train(data: tf.data.Dataset<number[][]>) {
  const BATCH_SIZE = 512

  const [trainXs, trainYs] = tf.tidy(() => {
    return [tf.tensor2d([[1, 2]]), tf.tensor1d([1])]
  })

  return myModel.fit(trainXs, trainYs, {
    batchSize: BATCH_SIZE,
    epochs: 10,
    shuffle: true,
  })
}

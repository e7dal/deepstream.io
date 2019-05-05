import 'mocha'
import { expect } from 'chai'

import * as C from '../constants'
const testHelper = require('../test/helper/test-helper')
const RpcProxy = require('./rpc-proxy')

const options = testHelper.getDeepstreamOptions()
const config = options.config
const services = options.services

describe.skip('rpcProxy proxies calls from and to the remote receiver', () => {
  let rpcProxy

  beforeEach(() => {
    rpcProxy = new RpcProxy(config, services, 'serverNameA')
  })

  it('manipulates the message before sending', () => {
    rpcProxy.send({
      topic: C.TOPIC.RPC,
      action: C.RPC_ACTIONS.ACCEPT,
      name: 'a',
      correlationId: 1234
    })

    expect(options.message.lastDirectSentMessage).to.deep.equal({
      serverName: 'serverNameA',
      topic: 'PRIVATE/P',
      message: {
        topic: C.TOPIC.RPC,
        action: C.RPC_ACTIONS.ACCEPT,
        name: 'a',
        correlationId: 1234
      }
    })
  })
})

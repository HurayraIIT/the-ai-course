---
{
  "title": "Tool sandboxing / Permissioning",
  "module": "security-safety-and-ethics",
  "order": 5,
  "sources": [
    "ai-agents"
  ],
  "resources": [
    {
      "type": "article",
      "title": "AI Sandbox | Harvard University Information Technology",
      "url": "https://www.huit.harvard.edu/ai-sandbox"
    },
    {
      "type": "article",
      "title": "How to Set Up AI Sandboxes to Maximize Adoption",
      "url": "https://medium.com/@emilholmegaard/how-to-set-up-ai-sandboxes-to-maximize-adoption-without-compromising-ethics-and-values-637c70626130"
    },
    {
      "type": "article",
      "title": "Sandboxes for AI - The Datasphere Initiative",
      "url": "https://www.thedatasphere.org/datasphere-publish/sandboxes-for-ai/"
    }
  ]
}
---

When you give an LLM tools — code execution, file access, web browsing, API calls — you're letting a probabilistic system take real actions. **Sandboxing** contains where those actions can happen: isolated containers, restricted filesystems, egress-filtered networks. **Permissioning** governs what actions are allowed at all: which tools an agent gets, with what scopes, and which calls require a human to approve. Together they decide the blast radius when the model does something you didn't intend.

This is the mitigation that makes prompt injection survivable. You cannot guarantee a model will never be hijacked by malicious input, but you *can* guarantee a hijacked model can't drop your production database if its credentials are read-only and it runs in a container with no route to production. The infamous **lethal trifecta** — an agent with access to private data, exposure to untrusted content, and the ability to communicate externally — is exactly what disciplined permissioning breaks apart. Agents amplify the stakes: a multi-step loop can chain small permissions into a large exploit.

In practice you'll run generated code in ephemeral sandboxes (containers, `gVisor`, WebAssembly, or hosted code-execution APIs) with CPU, memory, and network limits. You'll apply **least privilege** to every tool: scoped API tokens, allowlisted domains, read-only defaults. You'll mark destructive operations as requiring **human-in-the-loop** confirmation, cap agent iterations and spend, and log every tool call with its arguments so you can audit exactly what your agent did and why.
